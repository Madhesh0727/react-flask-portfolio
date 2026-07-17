import time
import requests
import threading
import os

def ping_server():
    # If a custom public URL is not defined, we can ping our own Render web service URL.
    url = os.environ.get('RENDER_EXTERNAL_URL', 'https://react-flask-portfolio.onrender.com')
    while True:
        try:
            # Ping the API endpoint to keep the load balancer active
            res = requests.get(f"{url}/api/portfolio", timeout=10)
            print(f"Keep-awake ping successful: {res.status_code}")
        except Exception as e:
            print(f"Keep-awake ping failed: {e}")
        # Sleep for 14 minutes (Render sleeps after 15 mins of inactivity)
        time.sleep(14 * 60)

def start_keep_awake():
    # Only start in production
    if os.environ.get('FLASK_ENV') == 'production':
        thread = threading.Thread(target=ping_server, daemon=True)
        thread.start()
        print("Keep-awake thread started.")
