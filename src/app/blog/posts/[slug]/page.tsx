import { notFound } from 'next/navigation'

// 静态定义的博客文章内容
const blogPosts = {
  'hello-world': {
    title: 'Hello World',
    date: '2024-06-01',
    content: `
# Hello World

这是我的第一篇博客，用于测试内容和代码分离。

欢迎来到我的个人网站！这里我会分享关于：

- 交互艺术创作
- 音乐制作
- 编程技术
- 生活感悟

希望你能在这里找到有趣的内容。

## 关于这个网站

这个网站使用了以下技术：

- **Next.js 15** - React 框架
- **Tailwind CSS** - 样式框架  
- **Three.js** - 3D 渲染
- **GSAP** - 动画库

感谢你的访问！
    `
  }
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-lg mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <time className="text-gray-600">{post.date}</time>
        </header>
        
        <div 
          className="prose-content"
          dangerouslySetInnerHTML={{ 
            __html: post.content.split('\n').map(line => {
              if (line.startsWith('# ')) {
                return `<h1>${line.slice(2)}</h1>`
              } else if (line.startsWith('## ')) {
                return `<h2>${line.slice(3)}</h2>`
              } else if (line.startsWith('- ')) {
                return `<li>${line.slice(2)}</li>`
              } else if (line.trim() === '') {
                return '<br>'
              } else {
                return `<p>${line}</p>`
              }
            }).join('')
          }}
        />
        
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <a 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            ← 返回博客列表
          </a>
        </footer>
      </article>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}
