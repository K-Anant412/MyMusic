from dotenv import load_dotenv
from urllib.parse import quote_plus
import os

load_dotenv()

class Config:
    """Base configurations"""
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-development-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback-jwt-secret-key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevelopmentConfig(Config):
    """Local development"""
    DEBUG=True
    
    db_user = os.getenv("DATABASE_USER", "root")
    db_host = os.getenv("DATABASE_HOST", "localhost")
    db_password = quote_plus(os.getenv("DATABASE_PASSWORD", "")) 
    db_port = os.getenv("DATABASE_PORT", "3306")
    db_database = os.getenv("DATABASE_NAME", "expense_tracker")
     
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_database}"
   
class ProductionConfig(Config):
    DEBUG = False

    db_user = os.getenv("DATABASE_USER")
    db_password = quote_plus(os.getenv("DATABASE_PASSWORD"))
    db_host = os.getenv("DATABASE_HOST")
    db_port = os.getenv("DATABASE_PORT")
    db_database = os.getenv("DATABASE_NAME")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_database}"
    )

    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "ssl": {}
        }
    }
    
config_options = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}