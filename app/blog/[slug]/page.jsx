import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.meta.title} — Jokko Pro Africa`,
    description: post.meta.excerpt || '',
  }
}

// Simple Markdown → HTML (sans dépendance externe)
function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|b|l|c])(.+)$/gm, '<p>$1</p>')
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const html = mdToHtml(post.body)

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', background: 'var(--ow)', borderBottom: '1px solid var(--bd)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.82rem', color: 'var(--bm)', marginBottom: 20 }}>
            ← Retour au blog
          </Link>
          {post.meta.category && <span className="pill pill-o" style={{ marginBottom: 12, display: 'inline-block' }}>{post.meta.category}</span>}
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            {post.meta.title}
          </h1>
          <div style={{ fontSize: '.82rem', color: 'var(--bm)', display: 'flex', gap: 16 }}>
            {post.meta.date && <span>{post.meta.date}</span>}
            {post.meta.readTime && <span>· {post.meta.readTime}</span>}
            {post.meta.author && <span>· {post.meta.author}</span>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {post.meta.image && (
            <img src={post.meta.image} alt={post.meta.title}
              style={{ width: '100%', borderRadius: 'var(--rx)', marginBottom: 40, objectFit: 'cover', maxHeight: 400 }} />
          )}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      <style>{`
        .blog-content { font-size: .97rem; line-height: 1.8; color: var(--bs); }
        .blog-content h1,.blog-content h2,.blog-content h3 {
          font-family: var(--fd); color: var(--b); margin: 2em 0 .6em;
        }
        .blog-content h2 { font-size: 1.5rem; }
        .blog-content h3 { font-size: 1.2rem; }
        .blog-content p { margin-bottom: 1.2em; }
        .blog-content ul { margin: 1em 0 1em 1.5em; }
        .blog-content li { margin-bottom: .4em; }
        .blog-content strong { color: var(--b); font-weight: 700; }
        .blog-content code { background: var(--obg); padding: 2px 6px; border-radius: 4px; font-size: .88em; }
        .blog-content blockquote {
          border-left: 3px solid var(--o); padding: 12px 20px; margin: 1.5em 0;
          background: var(--obg); border-radius: 0 8px 8px 0; font-style: italic;
        }
        .blog-content a { color: var(--o); text-decoration: underline; }
      `}</style>
    </>
  )
}
