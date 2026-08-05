from flask import Blueprint, request, send_file
from App.models import Songs, Playlist
from App.Utils.Response import success_response, error_response
from App import db
import os

song_route = Blueprint("song", __name__)

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
            songs.append({
                "id":song.song_id,
                "title":song.title,
                "artist":song.artist,
                "is_favorite":song.is_favorite
            })
            
        return success_response("Track list:", data=songs)
    
    except Exception as e:
        return error_response(message=str(e))