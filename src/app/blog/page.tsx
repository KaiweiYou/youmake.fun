import Image from 'next/image'

// Static blog posts definition for demo purposes
const blogPosts = [
  {
    title: 'The Art of Creative Coding',
    date: '2024-06-15',
    slug: 'art-of-creative-coding',
    excerpt: 'Exploring how code can be a medium for artistic expression and the tools that make it possible.',
    coverImage: null,
    tags: ['Creative Coding', 'Art', 'Technology']
  },
  {
    title: 'Building Interactive Music Visualizations',
    date: '2024-06-01',
    slug: 'interactive-music-visualizations',
    excerpt: 'A deep dive into creating real-time audio-reactive visuals using Web Audio API and WebGL.',
    coverImage: null,
    tags: ['Music', 'Visualization', 'WebGL']
  },
  {
    title: 'AI and Human Creativity: A Collaboration',
    date: '2024-05-20',
    slug: 'ai-human-creativity',
    excerpt: 'Thoughts on how artificial intelligence can enhance rather than replace human creative processes.',
    coverImage: null,
    tags: ['AI', 'Creativity', 'Philosophy']
  },
  {
    title: 'The Future of Interactive Art',
    date: '2024-05-05',
    slug: 'future-interactive-art',
    excerpt: 'Examining emerging technologies and their potential impact on interactive art installations.',
    coverImage: null,
    tags: ['Interactive Art', 'Future Tech', 'VR/AR']
  },
  {
    title: 'Sound Design in Digital Spaces',
    date: '2024-04-18',
    slug: 'sound-design-digital-spaces',
    excerpt: 'How spatial audio and procedural sound generation are changing the way we experience digital environments.',
    coverImage: null,
    tags: ['Sound Design', 'Audio', 'Digital Art']
  },
  {
    title: 'Hello World: Starting This Journey',
    date: '2024-04-01',
    slug: 'hello-world',
    excerpt: 'Welcome to my digital space where art, technology, and music converge. Here\'s what you can expect.',
    coverImage: null,
    tags: ['Introduction', 'Blog', 'Personal']
  }
]

// Get all blog posts metadata
async function getBlogPosts() {
  return blogPosts
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12">
      {/* Blog page header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Sharing thoughts on technology, art, and creative exploration</p>
      </div>

      {/* Blog posts list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Article cover image (if available) */}
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

            {/* Article content preview */}
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

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={`/blog/posts/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Read More
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

      {/* No posts message */}
      {posts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No blog posts yet...
        </div>
      )}
    </div>
  )
} 