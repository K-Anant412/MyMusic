from flask import Blueprint, request, send_file
from App.models import Songs, Playlist
from Utils.Response import success_response, error_response
from App import db
import db

song_route = Blueprint("song", __name__)