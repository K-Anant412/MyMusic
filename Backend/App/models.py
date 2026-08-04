from datetime import datetime, timezone
from App import db

playlist_songs = db.Table(
    "playlist_songs",
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id', ondelete="CASCADE"), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('song.song_id', ondelete="CASCADE"), primary_key=True)
)

class Songs(db.Model):
    """Songs table"""
    __tablename__ = "song"
    
    song_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False, default="Unknown Title", index=True)
    artist = db.Column(db.String(300), nullable=False, default="Unknown Artist", index=True)
    album = db.Column(db.String(300), nullable=False, default="Unknown Album", index=True)
    is_favorite = db.Column(db.Boolean, default=False, index=True)
    file_path = db.Column(db.String(500), unique=True, nullable=False)
    duration = db.Column(db.Integer)
    play_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

class Playlist(db.Model):
    """Playlists table"""
    __tablename__ = "playlist"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    songs = db.relationship(
        'Songs', 
        secondary=playlist_songs, 
        lazy='select', 
        backref=db.backref('playlists', lazy=True)
    )