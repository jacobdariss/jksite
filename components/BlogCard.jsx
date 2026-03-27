'use client'
import Link from 'next/link'

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{
      background:'#fff', border:'1px solid var(--bd)',
      borderRadius:'var(--rx)', overflow:'hidden',
      transition:'all .2s', display:'block', textDecoration:'none', color:'inherit',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shl)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
    >
      {post.image && (
        <div style={{ height:180, overflow:'hidden', background:'var(--obg)' }}>
          <img src={post.image} alt={post.title} style={{ width:'100%',height:'100%',objectFit:'cover' }} />
        </div>
      )}
      <div style={{ padding:24 }}>
        {post.category && <span className="pill pill-o" style={{ marginBottom:10,display:'inline-block' }}>{post.category}</span>}
        <h2 style={{ fontFamily:'var(--fd)',fontSize:'1.15rem',fontWeight:700,marginBottom:8,lineHeight:1.3 }}>{post.title}</h2>
        <p style={{ fontSize:'.85rem',color:'var(--bs)',lineHeight:1.6,marginBottom:16 }}>{post.excerpt}</p>
        <div style={{ fontSize:'.75rem',color:'var(--bm)',display:'flex',gap:12 }}>
          <span>{post.date}</span>
          {post.readTime && <span>· {post.readTime}</span>}
        </div>
      </div>
    </Link>
  )
}
