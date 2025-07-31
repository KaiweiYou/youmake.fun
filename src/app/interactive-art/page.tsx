

// Demo interactive art projects
const artProjects = [
  {
    title: 'Digital Canvas',
    date: '2024-03-15',
    slug: 'digital-canvas',
    description: 'An interactive digital painting experience where users can create art through gesture and touch.',
    coverImage: '/images/interactive-art/digital-canvas.jpg',
    technologies: ['p5.js', 'WebGL', 'Touch API'],
    status: 'Live Demo'
  },
  {
    title: 'Sound Visualization',
    date: '2024-02-20',
    slug: 'sound-visualization',
    description: 'Real-time audio visualization that transforms music into dynamic visual patterns and colors.',
    coverImage: '/images/interactive-art/sound-viz.jpg',
    technologies: ['Web Audio API', 'Three.js', 'GLSL'],
    status: 'Interactive'
  },
  {
    title: 'Motion Particles',
    date: '2024-01-10',
    slug: 'motion-particles',
    description: 'Particle system that responds to user movement and creates beautiful flowing animations.',
    coverImage: '/images/interactive-art/motion-particles.jpg',
    technologies: ['WebGL', 'Particle Systems', 'Motion Detection'],
    status: 'Prototype'
  },
  {
    title: 'Generative Landscapes',
    date: '2023-12-05',
    slug: 'generative-landscapes',
    description: 'Procedurally generated landscapes that evolve based on user interaction and time.',
    coverImage: '/images/interactive-art/gen-landscapes.jpg',
    technologies: ['Perlin Noise', 'WebGL', 'Procedural Generation'],
    status: 'Completed'
  },
  {
    title: 'Interactive Typography',
    date: '2023-11-18',
    slug: 'interactive-typography',
    description: 'Typography that comes alive with physics simulation and interactive letter manipulation.',
    coverImage: '/images/interactive-art/interactive-type.jpg',
    technologies: ['Matter.js', 'Canvas API', 'Typography'],
    status: 'Live Demo'
  },
  {
    title: 'AR Art Installation',
    date: '2023-10-22',
    slug: 'ar-art-installation',
    description: 'Augmented reality art piece that overlays digital sculptures onto the physical world.',
    coverImage: '/images/interactive-art/ar-installation.jpg',
    technologies: ['WebXR', 'AR.js', '3D Modeling'],
    status: 'Exhibition'
  }
]

export default function InteractiveArt() {
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Interactive Art</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Exploring the intersection of technology, creativity, and human interaction</p>
      </div>

      {/* Art Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artProjects.map((project) => (
          <article
            key={project.slug}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Project Cover Image */}
            <div className="relative h-48 w-full bg-gradient-to-br from-purple-400 to-blue-500">
              {/* Placeholder gradient background since images don't exist yet */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-sm opacity-80">Preview Image</div>
                </div>
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  project.status === 'Live Demo' ? 'bg-green-100 text-green-800' :
                  project.status === 'Interactive' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Prototype' ? 'bg-yellow-100 text-yellow-800' :
                  project.status === 'Exhibition' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
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

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={`/interactive-art/${project.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Explore Project
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

      {/* Call to Action */}
      <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Collaborate?</h3>
        <p className="text-gray-600 mb-6">
          I&apos;m always interested in exploring new forms of interactive art and creative technology.
        </p>
        <a
          href="/about-contact"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Get in Touch
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}