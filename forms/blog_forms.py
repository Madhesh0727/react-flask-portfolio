from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, SelectField, SubmitField, FileField
from wtforms.validators import DataRequired, Length, Optional

class BlogPostForm(FlaskForm):
    title = StringField('Post Title', validators=[DataRequired(), Length(max=200)])
    excerpt = StringField('Excerpt (short summary)', validators=[Optional(), Length(max=300)])
    content = TextAreaField('Content', validators=[DataRequired()])
    category = SelectField('Category', choices=[
        ('AI/ML', 'AI/ML'),
        ('Cybersecurity', 'Cybersecurity'),
        ('Tutorial', 'Tutorial'),
        ('News', 'News'),
        ('Other', 'Other')
    ], validators=[DataRequired()])
    image = FileField('Featured Image')
    published = BooleanField('Publish immediately')
    submit = SubmitField('Save Post')