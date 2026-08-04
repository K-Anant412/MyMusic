import os
from App import create_app

env_settings = os.getenv("FLASK_ENV", "development")
app = create_app(env_settings)

if __name__ == "__main__":
     app.run(port=5000, debug=True)
     