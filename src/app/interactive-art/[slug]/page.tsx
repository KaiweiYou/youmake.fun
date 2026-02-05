import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectsByCategory, getProjectBySlug, InteractiveArtProject } from '@/data/projects';

export async function generateStaticParams() {
    const projects = getProjectsByCategory('interactive-art');
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug('interactive-art', slug) as InteractiveArtProject;

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Left Column: Image and Key Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium">
                            {project.status}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                            {project.date}
                        </span>
                    </div>
                </div>

                {/* Right Column: Title and Content */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {project.title}
                    </h1>

                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
                        <p className="text-xl leading-relaxed font-light">
                            {project.description}
                        </p>
                        {/* Fallback for content: Display with basic preserving of whitespace if needed, 
                or ideally we would use a markdown renderer here in the future */}
                        {project.content && (
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 opacity-80 whitespace-pre-wrap font-sans text-base">
                                {project.content}
                            </div>
                        )}
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
