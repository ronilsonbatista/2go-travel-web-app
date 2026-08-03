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
  const guideSlugs = Object.keys(destinationGuides).map(slug => ({ slug }));
  const postSlugs = posts.map(post => ({ slug: post.slug }));
  return [...guideSlugs, ...postSlugs];
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
