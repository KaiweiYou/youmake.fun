import Image from 'next/image'

// Demo code projects
const codeProjects = [
  {
    title: 'AI Art Generator',
    date: '2024-03-25',
    slug: 'ai-art-generator',
    description: 'A web-based tool that uses machine learning to generate unique artworks from text prompts and style references.',
    coverImage: '/images/code/ai-art-generator.jpg',
    techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
    category: 'AI/ML',
    status: 'Live',
    githubUrl: 'https://github.com/yourusername/ai-art-generator',
    liveUrl: 'https://ai-art-gen.youmake.fun',
    features: ['Text-to-Image', 'Style Transfer', 'Batch Processing']
  },
  {
    title: 'Music Visualization Engine',
    date: '2024-02-18',
    slug: 'music-viz-engine',
    description: 'Real-time music visualization library that creates stunning visual effects synchronized with audio input.',
    coverImage: '/images/code/music-viz.jpg',
    techStack: ['JavaScript', 'WebGL', 'Web Audio API', 'Three.js', 'GLSL'],
    category: 'Creative Tools',
    status: 'Open Source',
    githubUrl: 'https://github.com/yourusername/music-viz-engine',
    liveUrl: 'https://music-viz.youmake.fun',
    features: ['Real-time Analysis', 'Custom Shaders', 'Export Options']
  },
  {
    title: 'Collaborative Drawing App',
    date: '2024-01-12',
    slug: 'collaborative-drawing',
    description: 'Multi-user drawing application with real-time collaboration, layer management, and vector graphics support.',
    coverImage: '/images/code/collab-draw.jpg',
    techStack: ['TypeScript', 'Socket.io', 'Canvas API', 'Node.js', 'Redis'],
    category: 'Web App',
    status: 'Beta',
    githubUrl: 'https://github.com/yourusername/collaborative-drawing',
    liveUrl: 'https://draw.youmake.fun',
    features: ['Real-time Sync', 'Layer System', 'Vector Graphics']
  },
  {
    title: 'Procedural Texture Generator',
    date: '2023-12-20',
    slug: 'texture-generator',
    description: 'Tool for generating procedural textures using noise functions and mathematical patterns for 3D graphics.',
    coverImage: '/images/code/texture-gen.jpg',
    techStack: ['C++', 'OpenGL', 'ImGui', 'Perlin Noise', 'CUDA'],
    category: 'Graphics',
    status: 'Completed',
    githubUrl: 'https://github.com/yourusername/texture-generator',
    liveUrl: null,
    features: ['Noise Functions', 'GPU Acceleration', 'Export Formats']
  },
  {
    title: 'Smart Home Dashboard',
    date: '2023-11-15',
    slug: 'smart-home-dashboard',
    description: 'IoT dashboard for monitoring and controlling smart home devices with custom automation rules.',
    coverImage: '/images/code/smart-home.jpg',
    techStack: ['Vue.js', 'MQTT', 'InfluxDB', 'Grafana', 'Raspberry Pi'],
    category: 'IoT',
    status: 'Personal Use',
    githubUrl: 'https://github.com/yourusername/smart-home-dashboard',
    liveUrl: null,
    features: ['Device Control', 'Data Visualization', 'Automation Rules']
  },
  {
    title: 'Code Poetry Generator',
    date: '2023-10-30',
    slug: 'code-poetry',
    description: 'Experimental tool that generates poetry from code structure and creates visual representations of algorithms.',
    coverImage: '/images/code/code-poetry.jpg',
    techStack: ['Python', 'Natural Language Processing', 'AST', 'Matplotlib', 'Streamlit'],
    category: 'Experimental',
    status: 'Research',
    githubUrl: 'https://github.com/yourusername/code-poetry',
    liveUrl: 'https://code-poetry.youmake.fun',
    features: ['AST Analysis', 'Poetry Generation', 'Visual Metaphors']
  }
]

export default function CodeCreations() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800'
      case 'Beta': return 'bg-blue-100 text-blue-800'
      case 'Open Source': return 'bg-purple-100 text-purple-800'
      case 'Completed': return 'bg-gray-100 text-gray-800'
      case 'Personal Use': return 'bg-yellow-100 text-yellow-800'
      case 'Research': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML': return '🤖'
      case 'Creative Tools': return '🎨'
      case 'Web App': return '🌐'
      case 'Graphics': return '🖼️'
      case 'IoT': return '🏠'
      case 'Experimental': return '🧪'
      default: return '💻'
    }
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Code Creations</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Building tools and artistic experiences through code</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {codeProjects.map((project) => (
          <article
            key={project.slug}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Project Preview */}
            <div className="relative h-48 w-full bg-gradient-to-br from-cyan-400 to-blue-500">
              {/* Placeholder gradient background since images don't exist yet */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">{getCategoryIcon(project.category)}</div>
                  <div className="text-sm opacity-80">Project Preview</div>
                </div>
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-20 text-white">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{project.date}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
                <ul className="text-sm text-gray-600">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Development Philosophy */}
      <div className="mt-16 p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Development Philosophy</h3>
        <p className="text-gray-600 mb-6">
          I believe in writing code that not only solves problems but also inspires creativity.
          My projects range from practical tools to experimental art pieces, always with an emphasis
          on clean architecture, user experience, and pushing the boundaries of what's possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-semibold mb-2">Purpose-Driven</h4>
            <p className="text-sm text-gray-600">Every line of code serves a clear purpose</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌟</div>
            <h4 className="font-semibold mb-2">User-Centric</h4>
            <p className="text-sm text-gray-600">Prioritizing intuitive and delightful experiences</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔬</div>
            <h4 className="font-semibold mb-2">Experimental</h4>
            <p className="text-sm text-gray-600">Exploring new technologies and paradigms</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🤝</div>
            <h4 className="font-semibold mb-2">Open Source</h4>
            <p className="text-sm text-gray-600">Sharing knowledge and building together</p>
          </div>
        </div>
      </div>
    </div>
  )
}