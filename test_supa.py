import os
from supabase import create_client

url = "https://tvfcgreprjhvejkkugsg.supabase.co"
key = "sb_publishable_8r7SODqIN3JZ2ubjocRwsw_tSS5gsup"

supabase = create_client(url, key)

with open("test.txt", "wb") as f:
    f.write(b"Hello")

try:
    with open("test.txt", "rb") as f:
        file_bytes = f.read()
    res = supabase.storage.from_("portfolio-images").upload(
        path="test.txt",
        file=file_bytes,
        file_options={"content-type": "text/plain"}
    )
    print("Upload Res:", res)
    pub_url = supabase.storage.from_("portfolio-images").get_public_url("test.txt")
    print("Pub URL:", pub_url)
except Exception as e:
    print("Error:", e)
