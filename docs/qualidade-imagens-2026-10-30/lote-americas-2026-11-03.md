# Continuação da curadoria — 2026-11-03

**Parcial. PR #34 draft. DO NOT MERGE.**

Base main: `c2e7504`. Continuação a partir de `52d04e1`. Sem rebase necessário: main não avançou.
Fotos novas aplicadas neste ciclo: **14**; placeholders substituídos acumulados: **1422 / 5.566**; restantes absolutos: **4144**.

| Região | Novas neste ciclo | Restantes absolutos |
| --- | ---: | ---: |
| Américas | 14 | 194 |
| Europa | 0 | 2352 |
| Mundo | 0 | 1598 |

| Destino tocado | Novas | Restantes |
| --- | ---: | ---: |
| assuncao | 3 | 21 |
| chicago | 2 | 0 |
| cidade-do-mexico | 5 | 4 |
| havana | 4 | 5 |

Preservação verificada: **2687 registros reais herdados**, incluindo os 958 anteriores e os 39 highlights; zero mudança em metadados ou bytes desses arquivos. Somente placeholders foram substituídos, mantendo path e tópico.

Audit global: **FAIL esperado**. Ocorrências envolvendo chaves novas: **0**. O log integral acompanha este checkpoint. Não há aprovação global de 107/107.

Inventário exato por posição, tema, path, região e tentativas/rejeições: [remaining-2026-11-03.json](remaining-2026-11-03.json). Decisões visuais e `applied.json` ficam em cada bundle; origens e licenças em `sources.json`.

Gaps especiais: Lima/chegada requer foto do terminal novo, sem reutilizar o antigo. Documentos de país errado, moeda antiga, mapa/diagrama, retrato, serviço descontinuado, panoramas 360° distorcidos e falsos matches foram rejeitados. Cancún, Bariloche e repetições herdadas permanecem no passe residual; não foram declarados resolvidos.

Sem alteração de layout, CSS, catálogo, conteúdo editorial, Admin, Core ou Flutter. Contagens regionais na tabela acima. Pendências das Américas e das demais regiões permanecem abertas; nenhuma região foi declarada concluída sem zerar seu inventário.

## Checkpoint de fechamento de Chicago

- 14 fotos novas: Chicago 2, Havana 4, Cidade do México 5 e Assunção 3. Chicago chegou a zero placeholders; Boston e São Francisco preservados.
- Contagens absolutas: Américas 194, Europa 2.352, Mundo 1.598; total 4.144. Acumulado de 1.422 substituições desde os 5.566 originais. Nenhuma região foi declarada concluída.
- Sete testes de origem externa passaram. Auditoria global FAIL com 12.627 ocorrências; zero envolvendo as 14 posições novas. Comparação dessas 14 com 2.701 fotos reais locais: zero candidatas perceptuais (dHash <=5, diferença de proporção <20%). Os bloqueios de path, bytes e IDs externos permanecem no aplicador/auditoria.
- Os destaques novos têm pelo menos 1.600px no lado maior, sem ampliação. Nenhum arquivo em src, CSS ou catálogo foi alterado neste lote.
- Busca corrigida de documentos: 100 arquivos do Commons consultados, 18 candidatos rejeitados por mapas, passaportes estrangeiros, documentos antigos, carimbos de contexto inverso ou retratos. Nenhum documento errado foi aplicado. A primeira consulta composta retornou zero arquivos e foi descartada como diagnóstico, sem alegar indisponibilidade global de fotos.
- Build do checkpoint europeu anterior 52d04e1 passou; este lote muda apenas fotos e evidências. O estado de CI deve ser conferido na PR, sem tratar build local anterior como comprovação de deploy deste commit.
- Lima/terminal novo, baía bioluminescente, documentos e demais lacunas seguem discriminados no inventário. Cancún, Bariloche e duplicata herdada de Gramado continuam pendentes no passe residual.

PR #34 permanece draft. Sem merge, screenshots finais ou alegação 107/107.
