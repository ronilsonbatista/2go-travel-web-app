# Américas — checkpoint parcial de imagens (30/10/2026)

**Não concluído. PR #34 continua draft. DO NOT MERGE.**

- Branch: `cursor/guia-imagens-qualidade-2026-10-30`; base original `c2e7504`.
- **770 / 5.566 placeholders substituídos** por fotos reais licenciadas, com decisão visual explícita.
- **4.796 placeholders restantes** (contagem absoluta; ponto usado como separador na tabela regional).
- Nenhuma ocorrência da auditoria envolve as 770 fotos novas; falhas herdadas permanecem abertas.
- 24 destinos tocados; São Francisco e Boston: 64/64 posições provisórias substituídas em cada cidade. Isso não equivale a uma aprovação global de todos os estados responsivos do site.
- Os 39 highlights anteriores foram preservados. Nenhuma fonte real anterior foi sobrescrita: os 770 registros alterados eram placeholders; paths e tópicos permaneceram idênticos.
- **Sem alteração de layout, CSS, conteúdo, catálogo, Admin, Core ou Flutter.**

| Região | Substituídos nesta continuação | Restantes |
| --- | ---: | ---: |
| Américas | 770 | 766 |
| Europa | 0 | 2.432 |
| Mundo | 0 | 1.598 |
| **Total** | **770** | **4.796** |

## Destinos tocados

| Destino / pasta | Substituídos | Ainda placeholder |
| --- | ---: | ---: |
| assuncao | 21 | 43 |
| bahamas | 20 | 44 |
| bogota | 29 | 35 |
| boston | 64 | 0 |
| chicago | 32 | 32 |
| cidade-do-mexico | 20 | 44 |
| cidade-do-panama | 33 | 31 |
| fernando-de-noronha | 39 | 25 |
| havai | 25 | 39 |
| havana | 28 | 36 |
| las-vegas | 30 | 34 |
| lima | 36 | 28 |
| los-angeles | 27 | 37 |
| medellin | 26 | 38 |
| montevideo | 31 | 33 |
| montreal | 36 | 28 |
| orlando | 34 | 30 |
| porto-rico | 32 | 32 |
| punta-cana | 26 | 38 |
| quito | 27 | 37 |
| san-andres | 21 | 43 |
| sao-francisco | 64 | 0 |
| toronto | 34 | 30 |
| vancouver | 35 | 29 |

## Revisão e rastreabilidade

- `sources.json`: autor, licença e URL da licença quando disponibilizada pela fonte, Commons File URL, título original, assunto, dimensões, hash SHA-256 e notas da inspeção.
- `regional-*/review.json`: candidatos e metadados consultados; **não significa aprovação**.
- `regional-*/decisions.json`: aceitação/rejeição explícita. `applied.json` registra o que foi efetivamente aplicado.
- `regional-rejections.json`: 331 decisões de rejeição nesta passagem; título, hash e motivo por tentativa (um candidato pode reaparecer em buscas diferentes).
- `regional-approved-sample.jpg`: amostra das fotos efetivamente aplicadas; contato editorial, **não captura final de produção**.
- O preparador separa busca/download de aprovação. O aplicador exige decisão explícita, licença reconhecida, autor, hash preservado, imagem decodificável >=1600 px no lado maior e fonte/família/binário únicos em relação ao manifesto atual.
- Exif foi normalizado ao salvar. Orientação e tema foram conferidos visualmente nas pranchas; a checagem automática de Exif sozinha não constitui inspeção visual.

## Exemplos de rejeições

Confeitaria no lugar das fontes do Bellagio; hotel Elara no lugar da High Roller; gravura do Zócalo; barcos militares no lugar da baía bioluminescente; retratos dominando Riverwalk e jardim; panoramas esféricos deformados; imagens escuras e possíveis variantes do mesmo original. Nenhum desses candidatos foi aplicado.

## Validação

A leitura de alguns assets no workspace ficou bloqueada no sistema de arquivos. A validação foi executada em `/tmp/2go-validation-remote`: clone da mesma branch no commit anterior + as 770 fotos aprovadas (SHA-256 conferido contra o manifesto) + os scripts e manifesto desta continuação.

- `npm run audit:guide-images`: **FAIL — 14.582 ocorrências**. Saída integral: `audit-regional-checkpoint.txt`.
- 6.845 posições dos guias + nove suplementares; 6.854 paths únicos e 6.847 hashes locais únicos (as outras sete posições usam URLs remotas). Isso **não** torna as fontes originais únicas: a auditoria ainda denuncia repetições herdadas de fontes/famílias e todos os placeholders restantes.
- Inventário: 4.796 placeholders, 85 destinos ainda com placeholder, 4.805 posições sem aprovação visual herdada/atual. As nove suplementares sem aprovação não foram declaradas revisadas.
- A cobertura geográfica passou a incluir os destinos dos lotes regionais. Havaí usa limite do arquipélago (Oahu/Maui/Hawaii Island já previstos no guia), em vez de apenas 80 km de Honolulu; não foi alterado o catálogo.
- `npm run build`: **PASSOU** na mesma cópia verificada.

## Continuação obrigatória

Finalizar os 766 slots das Américas (bairros, regiões, hotéis ilustrativos, essentials/days/trips e candidatos rejeitados), depois Europa e Mundo. Resolver fontes repetidas preexistentes e os destaques residuais de Cancún/Bariloche. Só gerar entrega final e screenshots finais após placeholders=0 e auditoria verde. Não mergear sem aceite humano.

## Histórico de checkpoints

- `3ddbf03`: primeiras 452 substituições enviadas na mesma branch.
- Atualização seguinte: mais 43 fotos de apoio de Boston, total 495; 5.071 placeholders restantes.

- Passagem seguinte: 87 fotos de bairros aprovadas em 22 destinos; total 582, com 4.984 placeholders restantes.

- Passagem seguinte: 188 fotos de regioes e hospedagem aprovadas em 22 destinos; total 770, com 4.796 placeholders restantes.

## Protecoes adicionais do preparador

Candidatos ja rejeitados deixam de reaparecer automaticamente; reconsideracao exige titulo explicitamente indicado no plano e nova decisao visual. Postais, litografias e fontes com data de captura/publicacao anterior a 1990 sao filtrados por padrao, pois uploads recentes e muitos pixels nao comprovam uma foto atual. A regra pode ser explicitamente revisitada por plano, sem aprovar a imagem automaticamente.

A auditoria usa limites por assunto para passeios e ilhas ja previstos nos guias (Kennedy Space Center, Guatape, Saona, Culebra/Vieques, Exuma/Out Islands e ilhas do Havai), mantendo os limites de cidade para os demais slots. Coordenadas invalidas agora geram erro. Isso nao produz aceite global: a auditoria segue FAIL enquanto houver pendencias.
