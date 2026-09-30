import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/cms';
import { destinationGuides } from '@/data/guidesData';
import BlogPostClient from '@/components/BlogPostClient';
import GuideArticleClient from '@/components/GuideArticleClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  if (destinationGuides[slug]) {
    const guide = destinationGuides[slug];
    return {
      title: guide.metaTitle,
      description: guide.metaDescription,
      alternates: {
        canonical: `https://2go.com.br/blog/${slug}`
      },
      openGraph: {
        title: guide.metaTitle,
        description: guide.metaDescription,
        type: 'article',
        images: [{ url: guide.heroImage, width: 1200, height: 630, alt: guide.title }]
      }
    };
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Guia Não Encontrado | 2GO Travel',
      description: 'O guia solicitado não foi encontrado.'
    };
  }

  return {
    title: `${post.title} | 2GO Travel`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | 2GO Travel`,
      description: post.excerpt,
      type: 'article',
      images: [{ url: post.image, width: 800, height: 600, alt: post.title }]
    }
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const slugs = new Set([
    ...Object.keys(destinationGuides),
    ...posts.map(post => post.slug)
  ]);
  return [...slugs].map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  if (destinationGuides[slug]) {
    return <GuideArticleClient guide={destinationGuides[slug]} />;
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
