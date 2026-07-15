import os
import uuid
from werkzeug.utils import secure_filename
from supabase import create_client, Client
from config import Config

def init_supabase():
    if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
        return None
    try:
        return create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
    except Exception as e:
        print(f"Failed to initialize Supabase client: {e}")
        return None

def upload_to_supabase(file, bucket_name='portfolio-images'):
    """
    Uploads a Werkzeug FileStorage object to Supabase storage.
    Returns the public URL if successful, otherwise None.
    """
    if not file or not file.filename:
        return None

    supabase: Client = init_supabase()
    if not supabase:
        print("Supabase not configured.")
        return None

    # Generate a unique filename
    original_filename = secure_filename(file.filename)
    file_ext = os.path.splitext(original_filename)[1]
    unique_filename = f"{uuid.uuid4().hex}{file_ext}"

    try:
        # Read file bytes
        file_bytes = file.read()
        
        # Upload to Supabase Storage
        res = supabase.storage.from_(bucket_name).upload(
            path=unique_filename,
            file=file_bytes,
            file_options={"content-type": file.content_type}
        )
        
        # Get public URL
        public_url = supabase.storage.from_(bucket_name).get_public_url(unique_filename)
        return public_url
        
    except Exception as e:
        print(f"Error uploading to Supabase: {e}")
        return None
