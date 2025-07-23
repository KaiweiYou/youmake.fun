import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import Image from 'next/image';
import Head from 'next/head';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

function getBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      title: data.title,
      date: data.date,
      slug: data.slug,
      content,
    };
  });
}

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <>
      <Head>
        <title>博客 | youmake.fun</title>
        <meta name="description" content="个人博客，记录技术与生活。" />
        <meta property="og:title" content="博客 | youmake.fun" />
        <meta property="og:description" content="个人博客，记录技术与生活。" />
      </Head>
      <div>
        <h1>博客</h1>
        {posts.map((post) => (
          <div key={post.slug} style={{marginBottom: 32}}>
            <h2>{post.title}</h2>
            <div style={{color: '#888', fontSize: 14}}>{post.date}</div>
            <Markdown
              components={{
                img: (props) => (
                  <Image src={props.src || ''} alt={props.alt || ''} width={600} height={400} style={{maxWidth: '100%', height: 'auto'}} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </Markdown>
          </div>
        ))}
      </div>
    </>
  );
} 