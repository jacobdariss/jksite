import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { meta: {}, body: content }
  const meta = {}
  match[1].split('\n').forEach(line => {
    const [key, ...vals] = line.split(':')
    if (key && vals.length) meta[key.trim()] = vals.join(':').trim().replace(/^["']|["']$/g, '')
  })
  return { meta, body: content.slice(match[0].length).trim() }
}

export async function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
  return files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { meta } = parseFrontmatter(raw)
    return {
      slug: file.replace(/\.mdx?$/, ''),
      title: meta.title || 'Sans titre',
      excerpt: meta.excerpt || '',
      date: meta.date || '',
      category: meta.category || '',
      image: meta.image || null,
      readTime: meta.readTime || null,
    }
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getPostBySlug(slug) {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { meta, body } = parseFrontmatter(raw)
  return { slug, meta, body }
}
