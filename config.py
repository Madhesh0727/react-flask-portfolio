import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    is_prod = os.environ.get('FLASK_ENV') == 'production'

    # Basic Flask config
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if is_prod and not SECRET_KEY:
        raise ValueError("No SECRET_KEY set for production app")
    if not SECRET_KEY:
        SECRET_KEY = 'dev-key-change-in-production'
    # Database
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_url = os.environ.get('DATABASE_URL')
    
    # Fix for Render's postgres:// vs postgresql:// protocol
    if db_url and db_url.startswith('postgres://'):
        db_url = db_url.replace('postgres://', 'postgresql://', 1)
        
    SQLALCHEMY_DATABASE_URI = db_url or \
        'sqlite:///' + os.path.join(basedir, 'portfolio.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }

    if db_url and db_url.startswith('postgresql'):
        SQLALCHEMY_ENGINE_OPTIONS.update({
            'pool_size': int(os.environ.get('DB_POOL_SIZE', 5)),
            'max_overflow': int(os.environ.get('DB_MAX_OVERFLOW', 2)),
            'pool_timeout': int(os.environ.get('DB_POOL_TIMEOUT', 30)),
        })
    
    # File upload
    UPLOAD_FOLDER = os.path.join(basedir, 'static/uploads')
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB max
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'svg', 'mp4', 'webm', 'ogg', 'mov'}
    
    # Session & Security
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    
    # Production security flags

    SESSION_COOKIE_SECURE = is_prod
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    REMEMBER_COOKIE_SECURE = is_prod
    REMEMBER_COOKIE_HTTPONLY = True
    
    # Admin credentials from env
    ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')
    
    if is_prod and (not ADMIN_USERNAME or not ADMIN_PASSWORD):
        raise ValueError("ADMIN_USERNAME and ADMIN_PASSWORD must be set in production")
        
    if not ADMIN_USERNAME:
        ADMIN_USERNAME = 'admin'
    if not ADMIN_PASSWORD:
        ADMIN_PASSWORD = 'admin@123'
