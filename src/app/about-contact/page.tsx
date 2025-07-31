

export default function AboutContact() {
  const skills = [
    { category: 'Creative Coding', items: ['p5.js', 'Three.js', 'WebGL', 'Processing', 'openFrameworks'] },
    { category: 'Web Development', items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python'] },
    { category: 'Music Technology', items: ['Max/MSP', 'Ableton Live', 'Web Audio API', 'SuperCollider', 'Pure Data'] },
    { category: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Generative Models'] },
    { category: 'Design Tools', items: ['Figma', 'Adobe Creative Suite', 'Blender', 'Cinema 4D', 'TouchDesigner'] }
  ]

  const experiences = [
    {
      title: 'Interactive Media Artist',
      organization: 'Freelance',
      period: '2022 - Present',
      description: 'Creating immersive digital experiences and interactive installations for galleries, festivals, and commercial clients.'
    },
    {
      title: 'Creative Technologist',
      organization: 'Digital Arts Studio',
      period: '2020 - 2022',
      description: 'Developed cutting-edge interactive experiences using emerging technologies like AR/VR, AI, and real-time graphics.'
    },
    {
      title: 'Software Engineer',
      organization: 'Tech Startup',
      period: '2018 - 2020',
      description: 'Built scalable web applications and contributed to open-source projects while exploring creative applications of technology.'
    }
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
    { name: 'Instagram', url: 'https://instagram.com/yourusername', icon: '📸' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🐦' },
    { name: 'SoundCloud', url: 'https://soundcloud.com/yourusername', icon: '🎵' },
    { name: 'Behance', url: 'https://behance.net/yourusername', icon: '🎨' }
  ]

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About & Contact</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Get to know me and let&apos;s connect</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* About Section */}
        <div className="lg:col-span-2 space-y-12">
          {/* Personal Introduction */}
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                  <div className="text-white text-4xl">👨‍💻</div>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hello, I&apos;m Kaiwei YOU</h2>
                <p className="text-gray-600 mb-4">
                  I&apos;m a creative technologist, interactive artist, and musician who explores the intersection
                  of art, technology, and human experience. My work spans from immersive digital installations
                  to experimental music compositions, always seeking to push the boundaries of what&apos;s possible
                  when creativity meets code.
                </p>
                <p className="text-gray-600 mb-4">
                  With a background in both computer science and fine arts, I bring a unique perspective to
                  every project. I believe that technology should not just solve problems, but also inspire
                  wonder, provoke thought, and create meaningful connections between people.
                </p>
                <p className="text-gray-600">
                  When I&apos;m not coding or creating, you can find me exploring new music, experimenting with
                  generative art, or diving deep into the latest developments in AI and machine learning.
                </p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <div className="text-blue-600 font-medium mb-2">{exp.organization}</div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">📧</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href="mailto:hello@youmake.fun" className="text-blue-600 hover:text-blue-800">
                    hello@youmake.fun
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600">📱</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Available for</div>
                  <div className="text-gray-900">Collaborations & Projects</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600">🌍</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="text-gray-900">Remote / Global</div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-lg mr-2">{social.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{social.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Status</h3>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Available for new projects</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              I&apos;m currently accepting new collaborations and commissions.
              Let&apos;s create something amazing together!
            </p>
            <a
              href="mailto:hello@youmake.fun?subject=Project Collaboration"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Start a Conversation
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
          </section>
        </div>
      </div>
    </div>
  )
}