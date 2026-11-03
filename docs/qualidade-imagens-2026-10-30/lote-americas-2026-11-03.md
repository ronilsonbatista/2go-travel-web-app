# Continuação da curadoria — 2026-11-03

**Parcial. PR #34 draft. DO NOT MERGE.**

Base main: `c2e7504`. Continuação a partir de `b6cdd9c`. Sem rebase necessário: main não avançou.
Fotos novas aplicadas neste ciclo: **370**; placeholders substituídos acumulados: **1328 / 5.566**; restantes absolutos: **4238**.

| Região | Novas neste ciclo | Restantes absolutos |
| --- | ---: | ---: |
| Américas | 370 | 208 |
| Europa | 0 | 2432 |
| Mundo | 0 | 1598 |

| Destino tocado | Novas | Restantes |
| --- | ---: | ---: |
| assuncao | 12 | 24 |
| bahamas | 20 | 19 |
| bogota | 20 | 5 |
| chicago | 18 | 2 |
| cidade-do-mexico | 25 | 9 |
| cidade-do-panama | 11 | 10 |
| fernando-de-noronha | 7 | 9 |
| havai | 21 | 8 |
| havana | 19 | 9 |
| las-vegas | 20 | 6 |
| lima | 16 | 4 |
| los-angeles | 20 | 5 |
| medellin | 14 | 13 |
| montevideo | 17 | 8 |
| montreal | 15 | 7 |
| orlando | 21 | 3 |
| porto-rico | 17 | 4 |
| punta-cana | 16 | 15 |
| quito | 18 | 12 |
| san-andres | 8 | 27 |
| toronto | 16 | 5 |
| vancouver | 19 | 4 |

Preservação verificada: **2237 registros reais herdados**, incluindo os 958 anteriores e os 39 highlights; zero mudança em metadados ou bytes desses arquivos. Somente placeholders foram substituídos, mantendo path e tópico.

Audit global: **FAIL esperado**. Ocorrências envolvendo chaves novas: **0**. O log integral acompanha este checkpoint. Não há aprovação global de 107/107.

Inventário exato por posição, tema, path, região e tentativas/rejeições: [remaining-2026-11-03.json](remaining-2026-11-03.json). Decisões visuais e `applied.json` ficam em cada bundle; origens e licenças em `sources.json`.

Gaps especiais: Lima/chegada requer foto do terminal novo, sem reutilizar o antigo. Documentos de país errado, moeda antiga, mapa/diagrama, retrato, serviço descontinuado, panoramas 360° distorcidos e falsos matches foram rejeitados. Cancún, Bariloche e repetições herdadas permanecem no passe residual; não foram declarados resolvidos.

Sem alteração de layout, CSS, catálogo, conteúdo editorial, Admin, Core ou Flutter. Europa e Mundo ainda não receberam fotos neste ciclo; a prioridade de concluir Américas permanece ativa.

## Validação da retomada

Build e teste existente passaram; sete testes de IDs de origem passaram. O teste real do aplicador bloqueou uma foto reencodada de Noronha sem alterar o manifesto.

Auditoria global: **FAIL, 12.909 ocorrências**, nenhuma envolvendo as 370 posições novas desde `b6cdd9c`. Comparação de 2.607 fotos reais locais: zero duplicata binária ou candidata perceptual envolvendo essas posições novas. A triagem dHash não prova ausência de todos os recortes possíveis; não há aprovação global.

18 fotos de papéis pequenos têm entre 1.024 e 1.599 px no lado maior. Todos os destaques novos têm pelo menos 1.600 px, sem ampliação artificial. Inventário: 4.238 placeholders em 85 destinos e 4.247 posições sem aprovação visual (inclui nove suplementares herdadas).

Desde `a16a498`, 175 posições adicionais foram aprovadas e três duplicatas retiradas (dois thumbnails de Noronha e um do Panamá): saldo de 172. Os três espaços retirados continuam pendentes; suas origens herdadas foram preservadas. Evidência em `withdrawn-aliases-2026-11-03.json`.

A retomada acrescentou 12 fotos, incluindo o panorama da ilha no hero de San Andrés. A mesma foto não foi repetida em bairro; a realocação de papel está documentada no bundle prioritário. Uma foto do palácio de Assunção foi rejeitada porque a descrição informa diapositivo original de 1970.

O preparador agora completa metadados omitidos pelo limite de thumbnails do Commons antes da triagem; cobertura por consulta em `metadata-coverage-2026-11-03.json`. Exemplos com 100 arquivos passaram a ter os 100 metadados consultados. Isso não concede aprovação visual automática.

Pranchas são evidência de curadoria, não screenshots finais de produção. Hospedagem usa imagens explicitamente ilustrativas da região. Screenshots finais e conclusão dos 107 destinos somente após placeholders=0 e auditoria verde. DO NOT MERGE.
