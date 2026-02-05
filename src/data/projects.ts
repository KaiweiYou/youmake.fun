export type ProjectCategory = 'interactive-art' | 'music' | 'code-creations';

export interface BaseProject {
    slug: string;
    title: string;
    date: string;
    description: string;
    content?: string; // Markdown or HTML content for the detail page
    coverImage: string;
    category: ProjectCategory;
    tags?: string[];
    featured?: boolean; // If true, show on home page slideshow
}

export interface InteractiveArtProject extends BaseProject {
    category: 'interactive-art';
    technologies: string[];
    status: 'Live Demo' | 'Interactive' | 'Prototype' | 'Exhibition' | 'Completed';
}

export interface MusicProject extends BaseProject {
    category: 'music';
    duration: string;
    genre: string;
    instruments: string[];
    audioFile?: string; // Path to audio file if available
    type: 'Album' | 'EP' | 'Single' | 'Installation';
}

export interface CodeProject extends BaseProject {
    category: 'code-creations';
    techStack: string[];
    projectType: 'AI/ML' | 'Creative Tools' | 'Web App' | 'Graphics' | 'IoT' | 'Experimental';
    status: 'Live' | 'Beta' | 'Open Source' | 'Completed' | 'Personal Use' | 'Research';
    githubUrl?: string;
    liveUrl?: string;
    features: string[];
}

export type Project = InteractiveArtProject | MusicProject | CodeProject;

export const projects: Project[] = [
    // --- Interactive Art ---
    {
        category: 'interactive-art',
        slug: 'digital-canvas',
        title: 'Digital Canvas',
        date: '2024-03-15',
        description: 'An interactive digital painting experience where users can create art through gesture and touch.',
        content: `
# Digital Canvas

Digital Canvas is an exploration into the freedom of expression in the digital realm. Unlike traditional mediums, digital art allows for undoing, layering, and instant transformation.

This project uses p5.js and WebGL to create a fluid, responsive canvas that reacts to the velocity and pressure of user input (simulated via mouse speed or touch radius).

## Key Features
- **Dynamic Brushes**: Brushes that change shape and color based on speed.
- **Layer Blending**: Real-time additive and subtractive mixing.
- **Export**: Users can save their creations as high-res images.
    `,
        coverImage: '/images/interactive-art/digital-canvas.jpg',
        technologies: ['p5.js', 'WebGL', 'Touch API'],
        status: 'Live Demo',
        featured: true,
    },
    {
        category: 'interactive-art',
        slug: 'sound-visualization',
        title: 'Sound Visualization',
        date: '2024-02-20',
        description: 'Real-time audio visualization that transforms music into dynamic visual patterns and colors.',
        coverImage: '/images/interactive-art/sound-viz.jpg',
        technologies: ['Web Audio API', 'Three.js', 'GLSL'],
        status: 'Interactive',
        featured: true,
    },
    {
        category: 'interactive-art',
        slug: 'motion-particles',
        title: 'Motion Particles',
        date: '2024-01-10',
        description: 'Particle system that responds to user movement and creates beautiful flowing animations.',
        coverImage: '/images/interactive-art/motion-particles.jpg',
        technologies: ['WebGL', 'Particle Systems', 'Motion Detection'],
        status: 'Prototype',
    },
    // --- Music ---
    {
        category: 'music',
        slug: 'ambient-soundscapes',
        title: 'Ambient Soundscapes',
        date: '2024-03-20',
        description: 'A collection of atmospheric ambient tracks created using field recordings and synthesized textures.',
        coverImage: '/music/ambient-cover.jpg',
        duration: '45:32',
        genre: 'Ambient',
        instruments: ['Field Recordings', 'Synthesizer', 'Digital Processing'],
        type: 'Album',
        featured: true,
    },
    {
        category: 'music',
        slug: 'algorithmic-compositions',
        title: 'Algorithmic Compositions',
        date: '2024-02-15',
        description: 'Music generated through algorithmic processes and machine learning, exploring the boundaries of AI creativity.',
        coverImage: '/music/algorithmic-cover.jpg',
        duration: '28:45',
        genre: 'Experimental',
        instruments: ['AI Generation', 'Code', 'Digital Synthesis'],
        type: 'EP',
        featured: true,
    },
    // --- Code Creations ---
    {
        category: 'code-creations',
        slug: 'ai-art-generator',
        title: 'AI Art Generator',
        date: '2024-03-25',
        description: 'A web-based tool that uses machine learning to generate unique artworks from text prompts and style references.',
        coverImage: '/images/code/ai-art-generator.jpg',
        techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
        projectType: 'AI/ML',
        status: 'Live',
        githubUrl: 'https://github.com/kaiweiYOU/ai-art-generator', // Updated username
        liveUrl: 'https://ai-art-gen.youmake.fun',
        features: ['Text-to-Image', 'Style Transfer', 'Batch Processing'],
        featured: true,
    },
    {
        category: 'code-creations',
        slug: 'music-viz-engine',
        title: 'Music Visualization Engine',
        date: '2024-02-18',
        description: 'Real-time music visualization library that creates stunning visual effects synchronized with audio input.',
        coverImage: '/images/code/music-viz.jpg',
        techStack: ['JavaScript', 'WebGL', 'Web Audio API', 'Three.js', 'GLSL'],
        projectType: 'Creative Tools',
        status: 'Open Source',
        githubUrl: 'https://github.com/kaiweiYOU/music-viz-engine',
        liveUrl: 'https://music-viz.youmake.fun',
        features: ['Real-time Analysis', 'Custom Shaders', 'Export Options'],
        featured: true,
    },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
    return projects.filter((project) => project.category === category);
}

export function getProjectBySlug(category: ProjectCategory, slug: string): Project | undefined {
    return projects.find((project) => project.category === category && project.slug === slug);
}

export function getAllProjects(): Project[] {
    return projects;
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((project) => project.featured);
}
