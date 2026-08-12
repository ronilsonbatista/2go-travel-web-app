import ConsultoriaClient from '@/components/ConsultoriaClient';

export const metadata = {
  title: 'Consultoria Personalizada de Viagem | 2GO Roteiros',
  description: 'Solicite uma consultoria de viagem sob medida com especialistas locais da 2GO e receba seu roteiro exclusivo diretamente no app.',
  openGraph: {
    title: 'Consultoria Personalizada de Viagem | 2GO Roteiros',
    description: 'Solicite uma consultoria de viagem sob medida com especialistas locais da 2GO.',
    type: 'website',
  }
};

export default function ConsultoriaPersonalizadaPage() {
  return <ConsultoriaClient />;
}
