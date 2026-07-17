import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Icons } from '../components/Icons';
import { Reveal } from '../components/animations/Reveal';
import { useEffect, useState } from 'react';

export function BlogDetail({ blog, settings }) {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (blog) {
      setPost(blog.find(b => b.slug === slug));
    }
  }, [blog, slug]);

  if (!blog || !settings) return null;

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Reveal>
          <div className="text-brand-500 mb-4"><Icons.AlertTriangle size={48} /></div>
          <h2 className="text-2xl font-display uppercase tracking-widest text-white mb-6">Transmission Not Found</h2>
          <Link to="/blog" className="px-6 py-3 border border-brand-500/50 text-brand-400 hover:bg-brand-500/10 transition-colors uppercase tracking-widest text-sm font-mono">
            Return to Transmissions
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | ${settings.owner_name}`} 
        description={post.excerpt}
        name={settings.owner_name}
      />
      <article className="pt-24 lg:pt-32 pb-16 max-w-4xl mx-auto">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-brand-400 font-mono text-[10px] uppercase tracking-widest mb-8 transition-colors">
            <Icons.ChevronRight className="rotate-180" /> Back to Transmissions
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono border border-brand-500/40 bg-brand-500/10 text-brand-500 px-3 py-1 uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-[10px] font-mono text-text-muted">{post.created_at}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-8">
            {post.title}
          </h1>
        </Reveal>

        {post.image && (
          <Reveal delay={0.1}>
            <div className="relative w-full aspect-video mb-12 border border-brand-400/20 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
              <img src={post.image.startsWith('http') ? post.image : `${import.meta.env.VITE_API_URL || ''}/static/uploads/blog/${post.image}`} 
                alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="prose prose-invert prose-brand max-w-none font-sans text-text-main leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: post.content }} />
        </Reveal>
      </article>
    </>
  );
}
