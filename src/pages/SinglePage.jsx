import { Home } from './Home';
import { About } from './About';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Blog } from './Blog';
import { Contact } from './Contact';

export function SinglePage({ data }) {
  const { settings, projects, skills, education, experience, certifications, blog } = data;
  
  return (
    <div className="flex flex-col gap-y-16 pb-24">
      <div id="home"><Home settings={settings} /></div>
      <div id="about"><About settings={settings} /></div>
      <div id="projects"><Projects projects={projects} settings={settings} /></div>
      <div id="skills"><Skills skills={skills} settings={settings} /></div>
      <div id="experience"><Experience experience={experience} education={education} certifications={certifications} settings={settings} /></div>
      <div id="blog"><Blog blog={blog} settings={settings} /></div>
      <div id="contact"><Contact settings={settings} /></div>
    </div>
  );
}
