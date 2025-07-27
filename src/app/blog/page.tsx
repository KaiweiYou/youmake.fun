import Image from 'next/image'

// 静态定义博客文章列表，避免动态导入问题
const blogPosts = [
  {
    title: 'Hello World',
    date: '2024-06-01',
    slug: 'hello-world',
    excerpt: '这是我的第一篇博客，用于测试内容和代码分离。',
    coverImage: null
  }
]

// 获取所有博客文章的元数据
async function getBlogPosts() {
  return blogPosts
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12">
      {/* 博客页面标题 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">博客</h1>
        <p className="text-lg text-gray-600">分享技术、艺术和生活的思考</p>
      </div>

      {/* 博客文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* 文章封面图（如果有） */}
            {post.coverImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* 文章内容预览 */}
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{post.date}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              
              <a 
                href={`/blog/posts/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                阅读更多
                <svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* 如果没有文章 */}
      {posts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          暂时还没有博客文章...
        </div>
      )}
    </div>
  )
} 