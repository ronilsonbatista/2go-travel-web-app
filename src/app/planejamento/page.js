import React from 'react';
import PlannerClient from '@/components/PlannerClient';

export const metadata = {
  title: 'Planejador de Viagens Personalizado | 2GO Travel',
  description: 'Monte seu roteiro de viagem personalizado minuto a minuto com nosso algoritmo inteligente. Economize horas de planejamento.',
};

export default function PlannerPage() {
  return (
    <PlannerClient />
  );
}
