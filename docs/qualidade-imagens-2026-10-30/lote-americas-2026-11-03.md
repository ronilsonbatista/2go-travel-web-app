# Continuação da curadoria — 2026-11-03

**Parcial. PR #34 draft. DO NOT MERGE.**

Base main atual: `de75083`; rebase concluído preservando as 1.438 substituições e 39 highlights. Continuação a partir de `e41d129`. Redesign #35 preservado integralmente; build e teste de sitemap passaram após o rebase.
Fotos novas aplicadas neste ciclo: **7**; placeholders substituídos acumulados: **1438 / 5.566**; restantes absolutos: **4128**.

| Região | Novas neste ciclo | Restantes absolutos |
| --- | ---: | ---: |
| Américas | 7 | 178 |
| Europa | 0 | 2352 |
| Mundo | 0 | 1598 |

| Destino tocado | Novas | Restantes |
| --- | ---: | ---: |
| assuncao | 1 | 20 |
| bahamas | 1 | 18 |
| cidade-do-mexico | 1 | 3 |
| havai | 4 | 1 |

Preservação verificada: **2710 registros reais herdados**, incluindo os 958 anteriores e os 39 highlights; zero mudança em metadados ou bytes desses arquivos. Somente placeholders foram substituídos, mantendo path e tópico.

Audit global: **FAIL esperado**. Ocorrências envolvendo chaves novas: **0**. O log integral acompanha este checkpoint. Não há aprovação global de 107/107.

Inventário exato por posição, tema, path, região e tentativas/rejeições: [remaining-2026-11-03.json](remaining-2026-11-03.json). Decisões visuais e `applied.json` ficam em cada bundle; origens e licenças em `sources.json`.

Lima/chegada: os dois slots foram substituídos por fotos do terminal novo; ver fontes e decisões de cada posição. Documentos de país errado, moeda antiga, mapa/diagrama, retrato, serviço descontinuado, panoramas 360° distorcidos e falsos matches foram rejeitados. Cancún, Bariloche e repetições herdadas permanecem no passe residual; não foram declarados resolvidos.

Sem alteração de layout, CSS, catálogo, conteúdo editorial, Admin, Core ou Flutter. Contagens regionais na tabela acima. Pendências das Américas e das demais regiões permanecem abertas; nenhuma região foi declarada concluída sem zerar seu inventário.

## Checkpoint de paisagens do Havaí e lacunas pontuais

- Sete substituições: Havaí 4, Bahamas 1, Cidade do México 1 e Assunção 1. Restantes absolutos: Américas 178, Europa 2.352, Mundo 1.598; total 4.128. Acumulado: 1.438 de 5.566.
- Havaí: duas vistas distintas de Na Pali, memorial do USS Arizona em Pearl Harbor e skyline costeiro de Waikiki. Resta apenas documentação/seguro no destino.
- Bahamas: Cove Beach / Paradise Island na miniatura. Cidade do México: Catedral Metropolitana. Assunção: fotografia real da fachada do Palacio de los López. Todos têm >=1.600px nativos no lado maior.
- Rejeitados: lago subexposto, escultura de abelha como parque, instituição cultural/lago para hospedagem, copas genéricas de coqueiros, praia de leitura fraca, costa obstruída, logotipo do palácio e chipa com foco macio/ruído. As buscas com zero candidato ficam documentadas como tentativas, sem alegar inexistência global de fontes.
- Preservação: 2.710 registros reais do checkpoint e41d129 sem mudanças de bytes ou metadados, incluindo os 958 e 39. Comparação das sete novas com 2.717 fotos reais sem candidatas perceptuais (dHash <=5, proporção <20%). Audit global FAIL esperado, zero ocorrências nas sete posições novas.
- Os dois gaps do terminal novo de Lima foram resolvidos no checkpoint e41d129 e continuam preservados. Cancún, Bariloche, duplicata herdada de Gramado e demais rejeições continuam no passe residual.
- Sem alteração de layout, CSS, catálogo ou arquivos src. Build anterior 52d04e1 não comprova deploy deste lote.

PR #34 ainda draft; sem merge, screenshots finais ou alegação 107/107.
