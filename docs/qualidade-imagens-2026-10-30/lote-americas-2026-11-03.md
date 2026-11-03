# Continuação da curadoria — 2026-11-03

**Parcial. PR #34 draft. DO NOT MERGE.**

Base main: `c2e7504`. Continuação a partir de `b6cdd9c`. Sem rebase necessário: main não avançou.
Fotos novas aplicadas neste ciclo: **358**; placeholders substituídos acumulados: **1316 / 5.566**; restantes absolutos: **4250**.

| Região | Novas neste ciclo | Restantes absolutos |
| --- | ---: | ---: |
| Américas | 358 | 220 |
| Europa | 0 | 2432 |
| Mundo | 0 | 1598 |

| Destino tocado | Novas | Restantes |
| --- | ---: | ---: |
| assuncao | 8 | 28 |
| bahamas | 20 | 19 |
| bogota | 19 | 6 |
| chicago | 16 | 4 |
| cidade-do-mexico | 25 | 9 |
| cidade-do-panama | 11 | 10 |
| fernando-de-noronha | 7 | 9 |
| havai | 21 | 8 |
| havana | 19 | 9 |
| las-vegas | 20 | 6 |
| lima | 14 | 6 |
| los-angeles | 20 | 5 |
| medellin | 14 | 13 |
| montevideo | 17 | 8 |
| montreal | 15 | 7 |
| orlando | 21 | 3 |
| porto-rico | 17 | 4 |
| punta-cana | 16 | 15 |
| quito | 18 | 12 |
| san-andres | 5 | 30 |
| toronto | 16 | 5 |
| vancouver | 19 | 4 |

Preservação verificada: **2237 registros reais herdados**, incluindo os 958 anteriores e os 39 highlights; zero mudança em metadados ou bytes desses arquivos. Somente placeholders foram substituídos, mantendo path e tópico.

Audit global: **FAIL esperado**. Ocorrências envolvendo chaves novas: **0**. O log integral acompanha este checkpoint. Não há aprovação global de 107/107.

Inventário exato por posição, tema, path, região e tentativas/rejeições: [remaining-2026-11-03.json](remaining-2026-11-03.json). Decisões visuais e `applied.json` ficam em cada bundle; origens e licenças em `sources.json`.

Gaps especiais: Lima/chegada requer foto do terminal novo, sem reutilizar o antigo. Documentos de país errado, moeda antiga, mapa/diagrama, retrato, serviço descontinuado, panoramas 360° distorcidos e falsos matches foram rejeitados. Cancún, Bariloche e repetições herdadas permanecem no passe residual; não foram declarados resolvidos.

Sem alteração de layout, CSS, catálogo, conteúdo editorial, Admin, Core ou Flutter. Europa e Mundo ainda não receberam fotos neste ciclo; a prioridade de concluir Américas permanece ativa.

## Validação do checkpoint de retomada

- `npm run build`: passou; `npm test`: passou; sete testes de IDs de origem passaram.
- Teste real do aplicador: uma fotografia reencodada de Noronha foi bloqueada como variante da imagem herdada, sem alterar o manifesto.
- Auditoria global: FAIL, 12.945 ocorrências; nenhuma envolve as 358 posições novas desde `b6cdd9c`. São 6.854 paths únicos e 6.847 hashes locais únicos, além de sete URLs remotas. Isso não é uma aprovação global das fontes.
- Comparação de 2.595 fotos reais locais: nenhuma duplicata binária ou candidata perceptual envolvendo essas 358 posições. dHash é uma triagem conservadora, não prova ausência de todos os recortes possíveis.
- Dezesseis imagens de papéis pequenos têm lado maior entre 1.024 e 1.599 px. Todos os destaques novos mantêm pelo menos 1.600 px; sem ampliação artificial.
- Inventário: 4.250 placeholders em 85 destinos; 4.259 posições sem aprovação visual, incluindo nove suplementares herdadas.

Desde `a16a498`, foram aprovadas 163 posições adicionais e retiradas três variantes duplicadas (dois thumbnails de Noronha e um do Panamá): saldo de 160 substituições. As fotos herdadas que davam origem às duplicatas foram preservadas. Os três espaços retirados permanecem pendentes de alternativas; evidência em `withdrawn-aliases-2026-11-03.json`.

As pranchas são evidências de curadoria, não screenshots finais de produção. Imagens de hospedagem são ilustrativas da região. A entrega final dos 107 destinos segue condicionada a placeholders=0, auditoria verde e aceite humano posterior; não fazer merge.
