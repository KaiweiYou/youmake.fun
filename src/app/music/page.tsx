'use client'

import { useState } from 'react'

// Demo music projects
const musicProjects = [
  {
    title: 'Ambient Soundscapes',
    date: '2024-03-20',
    slug: 'ambient-soundscapes',
    description: 'A collection of atmospheric ambient tracks created using field recordings and synthesized textures.',
    coverImage: '/music/ambient-cover.jpg',
    duration: '45:32',
    genre: 'Ambient',
    instruments: ['Field Recordings', 'Synthesizer', 'Digital Processing'],
    audioFile: '/music/ambient-preview.mp3',
    type: 'Album'
  },
  {
    title: 'Algorithmic Compositions',
    date: '2024-02-15',
    slug: 'algorithmic-compositions',
    description: 'Music generated through algorithmic processes and machine learning, exploring the boundaries of AI creativity.',
    coverImage: '/music/algorithmic-cover.jpg',
    duration: '28:45',
    genre: 'Experimental',
    instruments: ['AI Generation', 'Code', 'Digital Synthesis'],
    audioFile: '/music/algorithmic-preview.mp3',
    type: 'EP'
  },
  {
    title: 'Interactive Piano Piece',
    date: '2024-01-30',
    slug: 'interactive-piano',
    description: 'A piano composition that responds to audience interaction through motion sensors and real-time audio processing.',
    coverImage: '/music/piano-cover.jpg',
    duration: '12:18',
    genre: 'Contemporary Classical',
    instruments: ['Piano', 'Motion Sensors', 'Live Electronics'],
    audioFile: '/music/piano-preview.mp3',
    type: 'Single'
  },
  {
    title: 'Binaural Beats Meditation',
    date: '2023-12-10',
    slug: 'binaural-meditation',
    description: 'Therapeutic soundscapes using binaural beats and natural sounds for meditation and relaxation.',
    coverImage: '/music/meditation-cover.jpg',
    duration: '60:00',
    genre: 'Meditation',
    instruments: ['Binaural Synthesis', 'Nature Sounds', 'Drone'],
    audioFile: '/music/meditation-preview.mp3',
    type: 'Album'
  },
  {
    title: 'Glitch Symphony',
    date: '2023-11-25',
    slug: 'glitch-symphony',
    description: 'An orchestral piece that incorporates glitch aesthetics and digital artifacts as musical elements.',
    coverImage: '/music/glitch-cover.jpg',
    duration: '18:42',
    genre: 'Glitch',
    instruments: ['Orchestra Samples', 'Glitch Processing', 'Digital Artifacts'],
    audioFile: '/music/glitch-preview.mp3',
    type: 'Single'
  },
  {
    title: 'Generative Soundscape',
    date: '2023-10-08',
    slug: 'generative-soundscape',
    description: 'Ever-evolving soundscape that generates new musical patterns based on environmental data and user input.',
    coverImage: '/music/generative-cover.jpg',
    duration: '∞',
    genre: 'Generative',
    instruments: ['Environmental Data', 'Generative Algorithms', 'Real-time Synthesis'],
    audioFile: '/music/generative-preview.mp3',
    type: 'Installation'
  }
]

export default function Music() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const handlePlayPause = (slug: string) => {
    if (currentlyPlaying === slug) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(slug)
    }
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Music</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Exploring sound through traditional composition and experimental techniques</p>
      </div>

      {/* Music Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {musicProjects.map((project) => (
          <article
            key={project.slug}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Album Cover */}
            <div className="relative h-48 w-full bg-gradient-to-br from-indigo-400 to-purple-500">
              {/* Placeholder gradient background since images don't exist yet */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">🎵</div>
                  <div className="text-sm opacity-80">Album Cover</div>
                </div>
              </div>
              {/* Type Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  project.type === 'Album' ? 'bg-green-100 text-green-800' :
                  project.type === 'EP' ? 'bg-blue-100 text-blue-800' :
                  project.type === 'Single' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {project.type}
                </span>
              </div>
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
                <button
                  onClick={() => handlePlayPause(project.slug)}
                  className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                >
                  {currentlyPlaying === project.slug ? (
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">{project.date}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{project.duration}</div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {project.title}
              </h2>
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-3">{project.genre}</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Instruments/Tools */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.instruments.map((instrument) => (
                  <span
                    key={instrument}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md"
                  >
                    {instrument}
                  </span>
                ))}
              </div>

              <a
                href={`/music/${project.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Listen & Learn More
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

      {/* Music Philosophy Section */}
      <div className="mt-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Musical Philosophy</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          My approach to music combines traditional composition techniques with cutting-edge technology.
          I believe in exploring the boundaries between human creativity and algorithmic generation,
          creating immersive experiences that challenge our perception of sound and music.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🎹</div>
            <h4 className="font-semibold mb-2 dark:text-white">Traditional Roots</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Grounded in classical composition and music theory</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="font-semibold mb-2 dark:text-white">AI Collaboration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Exploring human-AI creative partnerships</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌊</div>
            <h4 className="font-semibold mb-2 dark:text-white">Interactive Experience</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Creating responsive and immersive soundscapes</p>
          </div>
        </div>
      </div>
    </div>
  )
}