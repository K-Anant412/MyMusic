import os
from App import create_app

env_settings = os.getenv("FLASK_ENV", "development")
app = create_app(env_settings)

if __name__ == "__main__":
    with app.app_context():
          from App.Utils.Scanner import scan_local_music_folder
          scan_local_music_folder("N:/youtub_songs")
    app.run(port=5000, debug=True)
