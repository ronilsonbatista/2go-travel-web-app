import React from 'react';
import RoteirosClient from '@/components/RoteirosClient';

export const metadata = {
  title: 'Roteiros de Viagem Personalizados e Otimizados | 2GO Roteiros',
  description: 'Veja exemplos de roteiros no site. Timeline, mapa e ajustes ficam no aplicativo 2GO.',
  openGraph: {
    title: 'Roteiros de Viagem Personalizados e Otimizados | 2GO Roteiros',
    description: 'Veja exemplos de roteiros no site. Timeline, mapa e ajustes ficam no aplicativo 2GO.',
    type: 'website',
  }
};

export default function RoteirosPage() {
  return <RoteirosClient />;
}
