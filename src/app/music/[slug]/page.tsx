import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectsByCategory, getProjectBySlug, MusicProject } from '@/data/projects';

export async function generateStaticParams() {
    const projects = getProjectsByCategory('music');
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug('music', slug) as MusicProject;

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                {/* Left Column: Album Cover */}
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 group">
                        <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                        />
                        {/* Play Button Overlay Placeholder */}
                        {project.audioFile && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1">
                                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                            <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Type</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{project.type}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                            <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Duration</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{project.duration}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg col-span-2">
                            <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Genre</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{project.genre}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Title and Details */}
                <div className="w-full md:w-2/3 flex flex-col">
                    <div className="mb-2 text-blue-600 dark:text-blue-400 font-medium">{project.date}</div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        {project.title}
                    </h1>

                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
                        <p className="text-xl leading-relaxed font-light">
                            {project.description}
                        </p>
                        {project.content && (
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 opacity-80 whitespace-pre-wrap font-sans text-base">
                                {project.content}
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Instruments & Tools</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.instruments.map((inst) => (
                                <span
                                    key={inst}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {inst}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
