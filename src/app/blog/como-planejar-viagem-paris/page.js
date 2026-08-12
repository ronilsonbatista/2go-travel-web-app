import GuideArticleClient from '@/components/GuideArticleClient';
import { destinationGuides } from '@/data/guidesData';

export const metadata = {
  title: 'Como planejar uma viagem para Paris: guia completo',
  description: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
  alternates: {
    canonical: 'https://2go.com.br/blog/como-planejar-viagem-paris'
  },
  openGraph: {
    title: 'Como planejar uma viagem para Paris: guia completo',
    description: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
    url: 'https://2go.com.br/blog/como-planejar-viagem-paris',
    siteName: '2GO Travel',
    type: 'article',
    images: [
      {
        url: '/images/destinations/paris/paris-eiffel-seine.jpg',
        width: 1200,
        height: 630,
        alt: 'Torre Eiffel ao entardecer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Como planejar uma viagem para Paris: guia completo',
    description: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
    images: ['/images/destinations/paris/paris-eiffel-seine.jpg']
  }
};

export default function BlogPostParisPage() {
  const guide = destinationGuides['como-planejar-viagem-paris'];
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Como planejar uma viagem para Paris: guia completo',
    description: 'Descubra os passos essenciais para organizar sua viagem, escolher onde ficar, entender o metrô e evitar os erros mais comuns em Paris.',
    image: 'https://2go.com.br/images/destinations/paris/paris-eiffel-seine.jpg',
    author: {
      '@type': 'Organization',
      name: '2GO Travel'
    },
    publisher: {
      '@type': 'Organization',
      name: '2GO Travel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://2go.com.br/images/Logo2GO.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://2go.com.br/blog/como-planejar-viagem-paris'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideArticleClient guide={guide} />
    </>
  );
}
