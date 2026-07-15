import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { SectionHeading, EmptyState } from '../components/Shared';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';

export function Blog({ blog, settings }) {
  if (!blog || !settings) return null;

  return (
    <>
      <SEO 
        title={`Blog | ${settings.owner_name}`} 
        description={`Read the latest blog posts and transmissions by ${settings.owner_name}.`}
        name={settings.owner_name}
      />
      <section className="pt-20 lg:pt-32 pb-10">
        <Reveal>
          <SectionHeading number="06 / TRANSMISSIONS" title="Blog" />
        </Reveal>
        
        {blog.length === 0 ? (
          <Reveal delay={0.1}>
            <EmptyState icon={Icons.BookOpen} message="No transmissions found." />
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {blog.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1} type="up">
                <TiltCard>
                  <article className="cyber-panel h-full group hover:border-brand-400/60 transition-all duration-500 overflow-hidden flex flex-col bg-black/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]">
                    {post.image && (
                      <div className="h-44 overflow-hidden relative">
                        <img src={`/static/uploads/blog/${post.image}`} alt={post.title}
                          className="w-full h-full object-cover grayscale-[70%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-sweep" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-mono border border-brand-500/40 bg-brand-500/10 text-brand-500 px-2 py-1 uppercase tracking-widest group-hover:border-brand-500 transition-colors">
                          {post.category}
                        </span>
                        <span className="text-[9px] font-mono text-text-muted">{post.created_at}</span>
                      </div>
                      <h3 className="font-display font-bold text-white text-base uppercase tracking-wide mb-3 group-hover:text-brand-400 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-text-muted text-xs leading-relaxed flex-grow mb-6">{post.excerpt}</p>
                      )}
                      <a href={`/blog/${post.slug}`}
                        className="mt-auto inline-flex items-center gap-2 text-[10px] font-mono text-brand-400 hover:text-brand-500 uppercase tracking-wider transition-colors group/link w-max">
                        READ MORE <span className="group-hover/link:translate-x-1 transition-transform"><Icons.ChevronRight /></span>
                      </a>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
