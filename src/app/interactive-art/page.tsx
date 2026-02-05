

// Demo interactive art projects
import Image from 'next/image';
import { getProjectsByCategory, InteractiveArtProject } from '@/data/projects';

export default function InteractiveArt() {
  const artProjects = getProjectsByCategory('interactive-art') as InteractiveArtProject[];

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
            <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-800">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm ${project.status === 'Live Demo' ? 'bg-green-100 text-green-800' :
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