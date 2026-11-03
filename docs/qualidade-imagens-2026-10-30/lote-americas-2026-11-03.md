# Continuação da curadoria — 2026-11-03

**Parcial. PR #34 draft. DO NOT MERGE.**

Base main: `c2e7504`. Continuação a partir de `b3bc591`. Sem rebase necessário: main não avançou.
Fotos novas aplicadas neste ciclo: **9**; placeholders substituídos acumulados: **1431 / 5.566**; restantes absolutos: **4135**.

| Região | Novas neste ciclo | Restantes absolutos |
| --- | ---: | ---: |
| Américas | 9 | 185 |
| Europa | 0 | 2352 |
| Mundo | 0 | 1598 |

| Destino tocado | Novas | Restantes |
| --- | ---: | ---: |
| fernando-de-noronha | 2 | 7 |
| havai | 3 | 5 |
| lima | 2 | 2 |
| san-andres | 2 | 25 |

Preservação verificada: **2701 registros reais herdados**, incluindo os 958 anteriores e os 39 highlights; zero mudança em metadados ou bytes desses arquivos. Somente placeholders foram substituídos, mantendo path e tópico.

Audit global: **FAIL esperado**. Ocorrências envolvendo chaves novas: **0**. O log integral acompanha este checkpoint. Não há aprovação global de 107/107.

Inventário exato por posição, tema, path, região e tentativas/rejeições: [remaining-2026-11-03.json](remaining-2026-11-03.json). Decisões visuais e `applied.json` ficam em cada bundle; origens e licenças em `sources.json`.

Lima/chegada: os dois slots foram substituídos por fotos do terminal novo; ver fontes e decisões de cada posição. Documentos de país errado, moeda antiga, mapa/diagrama, retrato, serviço descontinuado, panoramas 360° distorcidos e falsos matches foram rejeitados. Cancún, Bariloche e repetições herdadas permanecem no passe residual; não foram declarados resolvidos.

Sem alteração de layout, CSS, catálogo, conteúdo editorial, Admin, Core ou Flutter. Contagens regionais na tabela acima. Pendências das Américas e das demais regiões permanecem abertas; nenhuma região foi declarada concluída sem zerar seu inventário.

## Checkpoint Lima / Noronha / Havaí / San Andrés

- Nove fotos novas: Lima 2, Fernando de Noronha 2, Havaí 3 e San Andrés 2. Restantes absolutos: Américas 185, Europa 2.352, Mundo 1.598; total 4.135. Acumulado de 1.431 substituições.
- Lima: ambas as posições de chegada/aeroporto agora mostram o terminal novo, em fotografias CC0 capturadas em dezembro de 2025 na categoria específica. O terminal antigo rejeitado não foi reutilizado.
- Noronha: fachada do aeroporto e vista do aeródromo revisadas. Havaí: prato local de Honolulu, North Shore/Pipeline e costa de Punaluu na Big Island. San Andrés: costa da zona hoteleira e vista insular colombiana.
- Sete testes de origem externa passaram; comparação das nove fotos novas com 2.710 fotos reais sem candidatas perceptuais no limite dHash <=5 e proporção <20%. Auditoria permanece FAIL esperado; zero ocorrências nas posições novas.
- Rejeitados: três fotos noturnas de Mosquito Bay com leitura insuficiente; imagem de preparo de rondón com comida pouco legível; variante próxima da sequência da zona hoteleira; fotos policiais retornadas por buscas de pesos. Nenhuma dessas imagens foi aplicada. Ausência de candidato numa busca não foi tratada como indisponibilidade global de fotos.
- 2.701 fotos reais do checkpoint b3bc591 preservadas em bytes e metadados. Não houve alterações de layout, CSS ou catálogo. Build anterior 52d04e1 não comprova deploy deste commit.

PR #34 permanece draft. Sem merge e sem alegação 107/107.
