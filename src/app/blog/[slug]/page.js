import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cms';
import BlogPostClient from '@/components/BlogPostClient';

// 1. Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Artigo Não Encontrado | 2GO Travel',
      description: 'O artigo solicitado não está disponível em nossa base editorial.'
    };
  }

  const title = `${post.title} | Blog 2GO Travel`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date().toISOString(),
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image]
    }
  };
}

// 2. SSG static params pre-generation during build time
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

// 3. Server Component Page entry
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient 
      post={post}
    />
  );
}
