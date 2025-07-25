import { glob } from 'glob'
import { promises as fs } from 'fs'

// 获取所有博客文章的元数据
async function getBlogPosts() {
  const posts = await glob('./src/app/blog/posts/*.mdx')
  return Promise.all(
    posts.map(async (file) => {
      const content = await fs.readFile(file, 'utf8')
      const slug = file.split('/').pop()?.replace('.mdx', '')
      // MDX文件会自动导出metadata
      const { metadata } = await import(`./posts/${slug}.mdx`)
      return {
        ...metadata,
        slug,
      }
    })
  )
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div>
      <h1>博客</h1>
      {posts.map((post) => (
        <div key={post.slug} style={{marginBottom: '2rem'}}>
          <h2>{post.title}</h2>
          <div style={{color: '#888', fontSize: 14}}>{post.date}</div>
          <a href={`/blog/posts/${post.slug}`} style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: '#0070f3',
            textDecoration: 'none',
          }}>
            阅读更多 →
          </a>
        </div>
      ))}
    </div>
  )
} 