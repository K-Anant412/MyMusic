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
            songs.append(
                {
                    "id": song.song_id,
                    "title": song.title,
                    "artist": song.artist,
                    "is_favorite": song.is_favorite,
                }
            )

        return success_response("Track list:", data=songs)

    except Exception as e:
        return error_response(message=str(e))


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
        - Search song by ID
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

        db.session.commit()

        return success_response(message="Song updated")
    except Exception as e:
        return error_response(message=str(e))
