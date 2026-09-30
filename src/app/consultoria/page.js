import ConsultoriaClient from '@/components/ConsultoriaClient';

export const metadata = {
  title: 'Consultoria Personalizada de Viagem | 2GO Roteiros',
  description: 'Solicite uma consultoria de viagem sob medida com a curadoria da 2GO.',
  alternates: {
    canonical: '/consultoria-personalizada'
  }
};

export default function ConsultoriaPage() {
  return <ConsultoriaClient />;
}
