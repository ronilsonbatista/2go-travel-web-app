import QuemSomosClient from '@/components/QuemSomosClient';
import { absoluteSiteUrl } from '@/lib/site';

export const metadata = {
  title: 'Quem somos: tecnologia e curadoria para sua viagem | 2GO',
  description: 'A 2GO nasceu para transformar pesquisas e dúvidas em roteiros claros e fáceis de acompanhar. Conheça nossa história e diferenciais.',
  openGraph: {
    title: 'Quem somos: tecnologia e curadoria para sua viagem | 2GO',
    description: 'A 2GO nasceu para transformar pesquisas e dúvidas em roteiros claros e fáceis de acompanhar. Conheça nossa história e diferenciais.',
    url: absoluteSiteUrl('/quem-somos'),
    siteName: '2GO Travel',
    type: 'website'
  }
};

export default function QuemSomosPage() {
  return <QuemSomosClient />;
}
