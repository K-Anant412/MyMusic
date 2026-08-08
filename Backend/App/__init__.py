from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flasgger import Swagger
import os
from config import config_options

db = SQLAlchemy()
cors = CORS()
migrate = Migrate()

swagger_config = {
        "headers": [],
        "specs": [
            {
                "endpoint": 'apispec_1',
                "route": '/apispec_1.json',
                "rule_filter": lambda rule: True,
                "model_filter": lambda model: True,
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/apidocs/"
    }
swagger_template = {
        "swagger": "2.0",
        "info": {
            "title": "Personal music player",
            "description": "Production-ready personal music player",
            "version": "1.0.0"
        },
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header",
                "description": "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
            }
        }
    }

swagger = Swagger(config=swagger_config, template=swagger_template)

def create_app(config_name="development"):
    """Application factory"""
    
    app = Flask(__name__)
    
    allowed_origins = os.getenv("FRONTEND_URL", "http://localhost:5173").split(",")
    
    dev_origins = ["http://localhost:5000", "http://127.0.0.1:5000"]
    
    for origin in dev_origins:
        if origin not in allowed_origins:
            allowed_origins.append(origin)
            
    cors.init_app(
        app,
        resources={
            r"/api/*":
                {
                    "origins": allowed_origins,
                    "allow_headers": ["Content-Type"],
                    "supports_credientials": True
                }
        }
    )
    
    app.config.from_object(config_options[config_name])
    
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    swagger.init_app(app)
    
    
    from App.Route.songs import song_route
    app.register_blueprint(song_route, url_prefix='/api')
    
    from App import models
    with app.app_context():
        try:
            from App.Utils.Scanner import scan_local_music_folder
            
            MUSIC_PATH = r"N:\youtub_songs"
            
            print("Checking storage for new song")
            scan_local_music_folder(MUSIC_PATH)
        except Exception as e:
            print(f"Scanner intialization failed: {str(e)}")

    print(app.url_map)
    return app
    