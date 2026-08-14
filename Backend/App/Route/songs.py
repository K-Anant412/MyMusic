from flask import Blueprint, request, send_file
from App.models import Songs, Playlist
from App.Utils.Response import success_response, error_response
from App import db
import os

song_route = Blueprint("song", __name__)


# Songs routes
@song_route.route("/get_songs", methods=["GET"])
def show_all_songs():
    """
    Get all songs
    ---
    tags:
        - SongList
    responses:
        200:
            description: A list of songs
    """
    try:
        raw_list = Songs.query.all()

        if not raw_list:
            return error_response(message="Your directory has no songs.")

        songs = []
        for song in raw_list:
            songs.append(
                {
                    "id": song.song_id,
                    "title": song.title,
                    "artist": song.artist,
                    "is_favorite": song.is_favorite,
                    "album": song.album,
                    "duration": song.duration,
                    "file_path": song.file_path
                }
            )

        return success_response("Track list:", data=songs)

    except Exception as e:
        return error_response(message=str(e))

@song_route.route("/get_favorite_songs", methods=["GET"])
def show_favorite_songs():
    """
    Get all favorite songs
    ---
    tags:
        - SongList
    responses:
        200:
            description: A list of favorite songs
    """
    try:
        raw_list = Songs.query.filter_by(is_favorite=True).all()

        if not raw_list:
            return error_response(message="No favorite songs found.")

        songs = [
            {
                "id": song.song_id,
                "title": song.title,
                "artist": song.artist,
                "is_favorite": song.is_favorite,
                "album": song.album,
                "duration": song.duration,
                "file_path": song.file_path,
            }
            for song in raw_list
        ]

        return success_response("Favorite track list:", data=songs)

    except Exception as e:
        return error_response(message=str(e))

@song_route.route("/stream/<int:song_id>/audio", methods=["GET"])
def stream_song(song_id):
    song = Songs.query.get(song_id)

    if not song:
        return error_response("Song not found", 404)

    if not os.path.isfile(song.file_path):
        return error_response("Audio file not found", 404)

    return send_file(
        song.file_path,
        mimetype="audio/mpeg",
        conditional=True
    )

@song_route.route("/search_by_id/<int:id>", methods=["GET"])
def search_song_byId(id):
    """
    Search song by ID
    ---
    tags:
        - Search song by ID
    parameters:
        - in: path
          name: id
          type: integer
          required: true
          description: Song ID
    responses:
        200:
            description: Song found successfully
        404:
            description: Song not found
    """
    try:
        song_data = Songs.query.get(id)

        if not song_data:
            return error_response("Song not found.")

        song = {
            "id": song_data.song_id,
            "title": song_data.title,
            "artist": song_data.artist,
            "album": song_data.album,
            "duration": song_data.duration,
            "is_favorite": song_data.is_favorite,
            "path":song.file_path
        }

        return success_response("Song found: ", data=song)
    except Exception as e:
        return error_response(message=str(e))

@song_route.route("/search_by_title/<string:name>", methods=["GET"])
def search_song_byName(name):
    """
    Search song by Title
    ---
    tags:
        - Search song by Title
    parameters:
        - in: path
          name: name
          type: string
          required: true
          description: Song Title
    responses:
        200:
            description: Song found successfully
        404:
            description: Song not found
    """
    try:
        song_data = Songs.query.filter_by(title=name).first()

        if not song_data:
            return error_response("Song not found.")

        song = {
            "id": song_data.song_id,
            "title": song_data.title,
            "artist": song_data.artist,
            "album": song_data.album,
            "duration": song_data.duration,
            "is_favorite": song_data.is_favorite,
            "path":song.file_path
        }

        return success_response("Song found: ", data=song)

    except Exception as e:
        return error_response(message=str(e))

@song_route.route("/update_songs_data/<int:id>", methods=["PUT"])
def update_song_data(id):
    """
    Update Song Information
    ---
    tags:
      - Songs

    parameters:
      - in: path
        name: id
        type: integer
        required: true
        description: ID of the song to update

      - in: body
        name: body
        required: true
        schema:
            type: object
        properties:
            title:
                type: string
                example: Believer
            artist:
                type: string
                example: Imagine Dragons
            album:
                type: string
                example: Evolve
            is_favorite:
                type: boolean
                example: false

    responses:
        200:
            description: Song updated successfully

        400:
            description: Invalid request or no fields provided

        404:
            description: Song not found
    """
    try:
        data = request.get_json()
        song = Songs.query.get(id)

        if not song:
            return error_response("Song not found.")

        if data.get("title", "").strip():
            song.title = data["title"].strip()

        if data.get("artist", "").strip():
            song.artist = data["artist"].strip()

        if data.get("album", "").strip():
            song.album = data["album"].strip()
            
        if "is_favorite" in data:
            song.is_favorite = bool(data["is_favorite"])

        db.session.commit()

        return success_response(message="Song updated")
    except Exception as e:
        return error_response(message=str(e))

@song_route.route("/remove_song/<int:id>", methods=["DELETE"])
def remove_song(id):
    """
    Removed song by ID
    ---
    tags:
        - Remove song by ID
    parameters:
        - in: path
          name: id
          type: integer
          required: true
          description: Song ID
    responses:
        200:
            description: Song found successfully
        404:
            description: Song not found
    """
    try:
        song = Songs.query.get(id)
        
        if not song:
            return error_response("Song not found.")
        
        db.session.delete(song)
        db.session.commit()
        
        return success_response("Song removed from db")
    
    except Exception as e:
        return error_response(message=str(e))


# Playlist's routes
@song_route.route("/show_playlists", methods=["GET"])
def show_allPlaylist():
    """
    Get all playlists
    ---
    tags:
        - PlayLists
    responses:
        200:
            description: A list of playlists
    """
    try:
        data = Playlist.query.all()
        
        if not data:
            return error_response("Playlists are not exist yet.")
        
        playlists = []
        for play in data:
            
            playlists.append({
                "id":play.id,
                "name":play.name
            })
        
        return success_response(message="Playlists: ", data=playlists)
    except Exception as e:
        return error_response(message=str(e))

@song_route.route("/create_playlist/<string:name>", methods=["POST"])
def create_playlist(name):
    """
    Create new playlist
    ---
    tags:
        - Create new playlist
    parameters:
        - in: path
          name: name
          type: string
          required: true
          description: playlist name
    responses:
        200:
            description: playlist created
        404:
            description: Song not found
    """
    try:
        playlist_name = name
        
        existing = Playlist.query.filter_by(name=playlist_name).first()
        
        if existing:
            return error_response("Playlist already exist.")
        
        new_playlist = Playlist(name=playlist_name)
        db.session.add(new_playlist)
        db.session.commit()
        
        return success_response(message=f"New playlist was created: {playlist_name}")
    
    except Exception as e:
        return error_response(str(e))


@song_route.route("/playlists/<int:playlist_id>/songs/<int:id>", methods=["POST"])
def add_song_toPlaylist(playlist_id, id):
    """
    Add Song to Playlist
    ---
    tags:
        - Add song to Playlist

    parameters:
      - in: path
        name: playlist_id
        type: integer
        required: true
        description: ID of the playlist

      - in: path
        name: id
        type: integer
        required: true
        description: ID of the song to add

    responses:
        200:
            description: Song added to playlist successfully

        400:
            description: Song already exists in playlist

        404:
            description: Song or playlist not found
    """
    try:
        playlist = Playlist.query.get(playlist_id)
        song = Songs.query.get(id)
        
        if not song:
            return error_response("Song not found.")
        if not playlist:
            return error_response("Playlist not found.")
        
        if song in playlist.songs:
            return error_response("Song already exists in playlist.")
        
        playlist.songs.append(song)
        db.session.commit()
        
        return success_response(message="Song was added successfully.")
    
    except Exception as e:
        return error_response(message=str(e))


@song_route.route("/playlist_songs/<int:playlist_id>", methods=["GET"])
def playlist_songs(playlist_id):
    """
    Playlist's songs
    ---
    tags:
        - Playlist songs
    
    parameters:
      - in: path
        name: playlist_id
        type: integer
        required: true
        description: ID of the playlist
    
    responses:
        200:
            description: Song added to playlist successfully
    
        400:
            description: Song already exists in playlist
    
        404:
            description: Song or playlist not found
    """
    try:
        playlist = Playlist.query.get(playlist_id)
        if not playlist:
            return error_response("Playlist not found.")
        
        songs = []
        
        for song in playlist.songs:
            songs.append({
                "id":song.song_id,
                "title":song.title,
                "artist":song.artist,
                "album":song.album,
                "duration":song.duration
            })
            
        return success_response(message=f"Songs in {playlist.name}: ", data=songs)
    
    except Exception as e:
        return error_response(message=str(e))
    
    
@song_route.route("/remove_playlist/<int:id>", methods=["DELETE"])
def remove_playlist(id):
    """
    Removed playlist by ID
    ---
    tags:
        - Remove playlist by ID
    parameters:
        - in: path
          name: id
          type: integer
          required: true
          description: Playlist ID
    responses:
        200:
            description: Playlist found successfully
        404:
            description: Playlist not found
    """
    try:
        playlist = Playlist.query.get(id)
        
        if not playlist:
            return error_response(message="Playlist not exist")
        
        name = playlist.name
        
        db.session.delete(playlist)
        db.session.commit()
        
        return success_response(message=f"{name} was removed.")
    except Exception as e:
        return error_response(message=str(e))
    
    
@song_route.route("/remove_song_from_playlists/<int:playlist_id>/songs/<int:song_id>", methods=["DELETE"])
def remove_song_playlist(playlist_id,song_id):
    """
    Remove Song to Playlist
    ---
    tags:
        - Remove song from Playlist
    
    parameters:
      - in: path
        name: playlist_id
        type: integer
        required: true
        description: ID of the playlist
    
      - in: path
        name: song_id
        type: integer
        required: true
        description: ID of the song to add
    
    responses:
        404:
            description: Song or playlist not found
    """
    try:
        playlist = Playlist.query.get(playlist_id)
        song = Songs.query.get(song_id)
        
        if not playlist:
            return error_response("Playlist not exist.")
        if not song:
            return error_response("Song not exist.")
 
        if not song in playlist.songs:
            return error_response("Song not exist in playlist")
        
        name = song.title
        playlist_name = playlist.name
        
        playlist.songs.remove(song)
        db.session.commit()
        
        return success_response(message=f"{name} removed from {playlist_name}")
    
    except Exception as e:
        return error_response(message=str(e))   
        
    