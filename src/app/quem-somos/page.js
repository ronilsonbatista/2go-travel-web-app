import QuemSomosClient from '@/components/QuemSomosClient';
import { absoluteSiteUrl } from '@/lib/site';

export const metadata = {
  title: 'Quem somos | 2GO Travel',
  description: 'A 2GO ajuda a planejar a viagem com roteiros claros no aplicativo. Tecnologia, curadoria e o guia de viagem no site.',
  alternates: {
    canonical: absoluteSiteUrl('/quem-somos')
  },
  openGraph: {
    title: 'Quem somos | 2GO Travel',
    description: 'A 2GO ajuda a planejar a viagem com roteiros claros no aplicativo. Tecnologia, curadoria e o guia de viagem no site.',
    url: absoluteSiteUrl('/quem-somos'),
    siteName: '2GO Travel',
    type: 'website'
  }
};

export default function QuemSomosPage() {
  return <QuemSomosClient />;
}
