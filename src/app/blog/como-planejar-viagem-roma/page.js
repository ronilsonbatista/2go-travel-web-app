import GuideArticleClient from '@/components/GuideArticleClient';
import { destinationGuides } from '@/data/guidesData';

const guide = destinationGuides['como-planejar-viagem-roma'];

export const metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
  alternates: {
    canonical: `https://2go.com.br/blog/${guide.slug}`
  },
  openGraph: {
    title: guide.metaTitle,
    description: guide.metaDescription,
    url: `https://2go.com.br/blog/${guide.slug}`,
    siteName: '2GO Travel',
    type: 'article',
    images: [{ url: guide.heroImage, width: 1200, height: 630, alt: guide.title }]
  }
};

export default function GuideRomaPage() {
  return <GuideArticleClient guide={guide} />;
}
