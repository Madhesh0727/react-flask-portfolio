from flask import Blueprint, send_file, redirect, url_for, current_app
import os
from io import BytesIO
from PIL import Image, ImageDraw
from utils.site_data import get_settings_cached

public_bp = Blueprint('public', __name__)


# ── Redirect root to React frontend ──────────────────────────
@public_bp.route('/')
def index():
    return redirect('http://localhost:3000/', code=302)


# ── Circle favicon (used by admin panel) ─────────────────────
@public_bp.route('/circle-favicon.png')
def circle_favicon():
    settings = get_settings_cached()
    if settings and settings.profile_image:
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 'profile', settings.profile_image)
        if os.path.exists(file_path):
            try:
                img = Image.open(file_path).convert("RGBA")
                min_dim = min(img.size)
                left = (img.width - min_dim) / 2
                top = (img.height - min_dim) / 2
                right = (img.width + min_dim) / 2
                bottom = (img.height + min_dim) / 2
                img = img.crop((left, top, right, bottom))
                img = img.resize((128, 128), Image.Resampling.LANCZOS)
                mask = Image.new("L", img.size, 0)
                from PIL import ImageDraw as ID
                draw = ID.Draw(mask)
                draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
                output = Image.new("RGBA", img.size, (0, 0, 0, 0))
                output.paste(img, (0, 0), mask=mask)
                img_io = BytesIO()
                output.save(img_io, 'PNG')
                img_io.seek(0)
                return send_file(img_io, mimetype='image/png')
            except Exception:
                pass

    fallback_path = os.path.join(current_app.root_path, 'static', 'favicon.ico')
    if os.path.exists(fallback_path):
        return send_file(fallback_path)
    return "", 404


# ── Error handlers ────────────────────────────────────────────
@public_bp.app_errorhandler(404)
def not_found_error(error):
    return {"error": "Not found"}, 404

@public_bp.app_errorhandler(500)
def internal_error(error):
    from app import db
    db.session.rollback()
    return {"error": "Internal server error"}, 500
