import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog — Jokko Pro Africa',
  description: 'Actualités, guides et conseils sur le cloud souverain africain.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', background: 'var(--ow)', borderBottom: '1px solid var(--bd)' }}>
        <div className="container">
          <div className="label">Blog</div>
          <h1 className="title">Actualités & Guides</h1>
          <p className="subtitle">Conseils cloud, actualités Jokko, guides techniques pour les entreprises africaines.</p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--bm)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto', color: 'var(--bf)' }}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--bs)', marginBottom: 8 }}>Articles à venir</div>
              <p style={{ fontSize: '.9rem' }}>Le blog est en cours de préparation. Revenez bientôt.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
