import os
from datetime import datetime
from mutagen.mp3 import MP3
from mutagen.easyid3 import EasyID3
from mutagen import File as MutagenFile
from App import db
from App.models import Songs

def scan_local_music_folder(folder_path):
    """
    Recursively scans folder_path for audio files, extracts
    metadate, and bulk_inserts new tracks into the database. 
    """
    if not os.path.exists(folder_path):
        print(f"Directory path not found: {folder_path}")
        return False
    
    supported_extensions = ('.mp3', '.m4a', '.flac', '.wav')
    
    existing_paths = set(
        row[0] for row in db.session.query(Songs.file_path).all()
    )
    
    new_songs = []
    
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if file_name.lower().endswith(supported_extensions):
                file_path = os.path.abspath(os.path.join(root, file_name))
                
                if file_path in existing_paths:
                    continue
                
                title = os.path.splitext(file_name)[0]
                artist = 'Unknown Artist'
                album = 'Unknown Album'
                duration = 0
                
                try:
                    try:
                        audio = MP3(file_path, ID3=EasyID3)
                        title = audio.get('title', [title])[0] or title
                        artist = audio.get('artist', [artist])[0] or artist
                        album = audio.get('album', [album])[0] or album
                        duration = int(audio.info.length)
                    except Exception:
                        audio = MutagenFile(file_path)
                        if audio is not None and audio.info:
                            duration = int(getattr(audio.info, 'length', 0))
                            if hasattr(audio, 'tags') and audio.tags:
                                title = audio.tags.get('title', [title])[0] or title
                                artist = audio.tags.get('artist', [artist])[0] or artist
                                album = audio.tags.get('album', [album])[0] or album
                                
                    new_song = Songs(
                        title=str(title).strip(),
                        artist=str(artist).strip(),
                        album=str(album).strip(),
                        duration=duration,
                        file_path=file_path,
                        is_favorite=False
                    )
                    
                    new_songs.append(new_song)
                    existing_paths.add(file_path)
                    print(f"Staged: {title}")
                    
                except Exception as e:
                    print(f"Skipping unreadable file {file_name}: {e}")
                    
    if new_songs:
        try:
            db.session.add_all(new_songs)
            db.session.commit()
            print(f"Successfully added {len(new_songs)} new songs to the database,")    
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Databse commit failed: {e}")
            return False
        
    print("No new song found,")
    return True
            