import BlogPostParisClient from '@/components/BlogPostParisClient';

export const metadata = {
  title: 'Como planejar uma viagem para Paris: guia completo (2026)',
  description: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
  alternates: {
    canonical: 'https://2go.com.br/blog/como-planejar-viagem-paris'
  },
  openGraph: {
    title: 'Como planejar uma viagem para Paris: guia completo (2026)',
    description: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
    url: 'https://2go.com.br/blog/como-planejar-viagem-paris',
    siteName: '2GO Travel',
    type: 'article',
    publishedTime: '2026-06-12T00:00:00.000Z',
    authors: ['2GO Travel Editorial'],
    images: [
      {
        url: 'https://2go.com.br/assets/paris.png',
        width: 1200,
        height: 630,
        alt: 'Vista noturna da Torre Eiffel e do Rio Sena em Paris'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Como planejar uma viagem para Paris: guia completo (2026)',
    description: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
    images: ['https://2go.com.br/assets/paris.png']
  }
};

export default function BlogPostParisPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Como planejar uma viagem para Paris sem estresse',
    description: 'Descubra os passos essenciais para organizar sua viagem, escolher onde ficar, entender o metrô e evitar os erros mais comuns em Paris.',
    image: 'https://2go.com.br/assets/paris.png',
    datePublished: '2026-06-12T00:00:00.000Z',
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
      <BlogPostParisClient />
    </>
  );
}
