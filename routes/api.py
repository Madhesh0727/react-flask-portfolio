from flask import Blueprint, jsonify, request
from models import Project, Skill, Settings, Message, Education, Experience, Certification, BlogPost
from app import db

api_bp = Blueprint('api', __name__)


@api_bp.route('/portfolio', methods=['GET'])
def get_portfolio():
    settings = Settings.query.first()

    settings_data = {
        'bio': settings.bio if settings else '',
        'what_i_do': settings.what_i_do if settings else '',
        'tagline': settings.tagline if settings else '',
        'github_url': settings.github_url if settings else '',
        'linkedin_url': settings.linkedin_url if settings else '',
        'twitter_url': settings.twitter_url if settings else '',
        'email': settings.email if settings else '',
        'location': settings.location if settings else '',
        'specialty': settings.specialty if settings else '',
        'owner_name': settings.owner_name if settings else 'Developer',
        'site_name': settings.site_name if settings else 'MADHESH.EXE',
        'resume_template': settings.resume_template if settings else 'resume_default.html',
        'profile_image': (
            settings.profile_image
            if settings and settings.profile_image
            else f"https://ui-avatars.com/api/?name={settings.owner_name.replace(' ', '+') if settings and settings.owner_name else 'Dev'}&background=random"
        ),
    }

    # Projects
    projects_data = []
    for p in Project.query.order_by(Project.featured.desc(), Project.created_at.desc()).all():
        projects_data.append({
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'long_description': p.long_description or '',
            'tech_stack': p.get_tech_list(),
            'github_link': p.github_link or '',
            'demo_link': p.demo_link or '',
            'category': p.category,
            'featured': p.featured,
            'image': p.get_primary_image() or '',
        })

    # Skills - grouped by category
    skills_data = []
    for s in Skill.query.order_by(Skill.category, Skill.display_order).all():
        skills_data.append({
            'name': s.name,
            'category': s.category,
            'level': s.level,
            'icon': s.icon or '',
        })

    # Education
    education_data = []
    for e in Education.query.order_by(Education.display_order, Education.created_at.desc()).all():
        education_data.append({
            'id': e.id,
            'degree': e.degree,
            'college': e.college,
            'start_date': e.start_date or '',
            'end_date': e.end_date or '',
            'cgpa': e.cgpa or '',
            'description': e.description or '',
        })

    # Experience
    experience_data = []
    for ex in Experience.query.order_by(Experience.display_order, Experience.created_at.desc()).all():
        experience_data.append({
            'id': ex.id,
            'role': ex.role,
            'company': ex.company,
            'start_date': ex.start_date or '',
            'end_date': ex.end_date or '',
            'description': ex.description or '',
        })

    # Certifications
    cert_data = []
    for c in Certification.query.order_by(Certification.display_order, Certification.created_at.desc()).all():
        cert_data.append({
            'id': c.id,
            'name': c.name,
            'issuer': c.issuer,
            'date_earned': c.date_earned or '',
            'url': c.url or '',
            'description': c.description or '',
        })

    # Blog posts (published only)
    blog_data = []
    for b in BlogPost.query.filter_by(published=True).order_by(BlogPost.created_at.desc()).limit(6).all():
        blog_data.append({
            'id': b.id,
            'title': b.title,
            'slug': b.slug,
            'excerpt': b.excerpt or '',
            'category': b.category,
            'image': b.get_primary_image() or '',
            'created_at': b.created_at.strftime('%b %d, %Y') if b.created_at else '',
        })

    return jsonify({
        'settings': settings_data,
        'projects': projects_data,
        'skills': skills_data,
        'education': education_data,
        'experience': experience_data,
        'certifications': cert_data,
        'blog': blog_data,
    })


@api_bp.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'error': 'Missing required fields'}), 400
    try:
        new_msg = Message(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            subject=data.get('subject', ''),
            message=data['message']
        )
        db.session.add(new_msg)
        db.session.commit()
        return jsonify({'success': 'TRANSMISSION SUCCESSFUL.'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
