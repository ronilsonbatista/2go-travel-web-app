// 2GO Travel Internal AI Routing & Prompt Orchestrator
// Prepares prompting structures for LLM integrations (like Gemini API) while keeping marketing messaging commercially aligned.

export function generateSystemPrompt(destinationName, days, budget, style) {
  return `Você é um Curador Local especialista em viagens de alto padrão para ${destinationName}.
Seu objetivo é desenhar um roteiro diário otimizado, cobrindo os melhores pontos turísticos, segredos locais e dicas gastronômicas refinadas.

Restrições do Roteiro:
- Duração: ${days} dias.
- Estilo de Viagem: ${style === 'luxury' ? 'Luxo (restaurantes sofisticados, hotéis 5 estrelas)' : style === 'comfort' ? 'Conforto (melhor custo-benefício, atrações clássicas)' : 'Econômico (otimização de custos)'}.
- Orçamento Estimado: Nível ${budget}.

Formato de Saída (JSON Estrito):
Retorne apenas um objeto JSON com a seguinte estrutura:
{
  "title": "Roteiro em ${destinationName} personalizado",
  "desc": "Breve introdução charmosa focando na experiência sob medida em ${destinationName}",
  "duration": ${days},
  "destinationSlug": "${destinationName.toLowerCase().replace(/[^a-z]/g, '')}",
  "days": [
    {
      "day": "Dia 1",
      "title": "Título resumido do foco do dia",
      "events": [
        {
          "time": "09:00",
          "title": "Nome da atração ou atividade",
          "desc": "Recomendação e dica do curador local sobre o local"
        }
      ]
    }
  ]
}`;
}

export function generateUserPrompt(destinationName, days, budget, style) {
  return `Desenhe um roteiro detalhado de ${days} dias para ${destinationName} com orçamento ${budget} e estilo de viagem ${style}. Enfatize curadoria de qualidade e rotas otimizadas para evitar desperdício de tempo.`;
}

// Simulated LLM API pipeline call
export async function mockAiGenerationCall(destinationName, days, budget, style) {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Build a realistic customized mock response matching requested duration
  const daysArray = Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    return {
      day: `Dia ${dayNum}`,
      title: `Explorando o melhor da cultura local - Turno ${dayNum}`,
      events: [
        { time: '09:00', title: `Atração Histórica Principal - ${destinationName}`, desc: 'Chegue cedo para evitar filas e aproveite o nascer do sol para fotos espetaculares.' },
        { time: '13:00', title: 'Almoço em Bistrô Recomendado', desc: 'Indicação de prato tradicional local sugerido por especialistas da 2GO.' },
        { time: '15:30', title: 'Caminhada Cênica e Paradas Culturais', desc: 'Explore os arredores a pé para descobrir as ruas mais charmosas e lojas artesanais.' },
        { time: '20:00', title: 'Jantar em Restaurante Especial', desc: 'Conclua o dia com uma experiência gastronômica autêntica.' }
      ]
    };
  });

  return {
    title: `Roteiro Inteligente em ${destinationName}`,
    desc: `Curadoria autoral de ${days} dias para sua viagem no estilo ${style === 'luxury' ? 'Luxo 👑' : style === 'comfort' ? 'Conforto 🧳' : 'Econômico 🎒'}. Organizado minutagem a minutagem por quem conhece o destino.`,
    duration: days,
    destinationSlug: destinationName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'paris',
    days: daysArray
  };
}
