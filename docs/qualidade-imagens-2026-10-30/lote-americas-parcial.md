# Américas — checkpoint parcial de imagens (30/10/2026)

**Não concluído. PR #34 continua draft. DO NOT MERGE.**

- Branch: `cursor/guia-imagens-qualidade-2026-10-30`; base original `c2e7504`.
- **958 / 5.566 placeholders substituídos** por fotos reais licenciadas, com decisão visual explícita.
- **4.608 placeholders restantes** (contagem absoluta; ponto usado como separador na tabela regional).
- Nenhuma ocorrência da auditoria envolve as 958 fotos novas; falhas herdadas permanecem abertas.
- 24 destinos tocados; São Francisco e Boston: 64/64 posições provisórias substituídas em cada cidade. Isso não equivale a uma aprovação global de todos os estados responsivos do site.
- Os 39 highlights anteriores foram preservados. Nenhuma fonte real anterior foi sobrescrita: os 958 registros alterados eram placeholders; paths e tópicos permaneceram idênticos.
- **Sem alteração de layout, CSS, conteúdo, catálogo, Admin, Core ou Flutter.**

| Região | Substituídos nesta continuação | Restantes |
| --- | ---: | ---: |
| Américas | 958 | 578 |
| Europa | 0 | 2.432 |
| Mundo | 0 | 1.598 |
| **Total** | **958** | **4.608** |

## Destinos tocados

| Destino / pasta | Substituídos | Ainda placeholder |
| --- | ---: | ---: |
| assuncao | 28 | 36 |
| bahamas | 25 | 39 |
| bogota | 39 | 25 |
| boston | 64 | 0 |
| chicago | 44 | 20 |
| cidade-do-mexico | 30 | 34 |
| cidade-do-panama | 43 | 21 |
| fernando-de-noronha | 48 | 16 |
| havai | 35 | 29 |
| havana | 36 | 28 |
| las-vegas | 38 | 26 |
| lima | 44 | 20 |
| los-angeles | 39 | 25 |
| medellin | 37 | 27 |
| montevideo | 39 | 25 |
| montreal | 42 | 22 |
| orlando | 40 | 24 |
| porto-rico | 43 | 21 |
| punta-cana | 33 | 31 |
| quito | 34 | 30 |
| san-andres | 29 | 35 |
| sao-francisco | 64 | 0 |
| toronto | 43 | 21 |
| vancouver | 41 | 23 |

## Revisão e rastreabilidade

- `sources.json`: autor, licença e URL da licença quando disponibilizada pela fonte, Commons File URL, título original, assunto, dimensões, hash SHA-256 e notas da inspeção.
- `regional-*/review.json`: candidatos e metadados consultados; **não significa aprovação**.
- `regional-*/decisions.json`: aceitação/rejeição explícita. `applied.json` registra o que foi efetivamente aplicado.
- `regional-rejections.json`: 429 decisões de rejeição nesta passagem; título, hash e motivo por tentativa (um candidato pode reaparecer em buscas diferentes).
- `regional-approved-sample.jpg`: amostra das fotos efetivamente aplicadas; contato editorial, **não captura final de produção**.
- O preparador separa busca/download de aprovação. O aplicador exige decisão explícita, licença reconhecida, autor, hash preservado, imagem decodificável e fonte/família/binário únicos em relação ao manifesto atual. As 958 fotos aplicadas têm pelo menos 1600 px no lado maior; o preparador permite piso explícito de 1024 px apenas para papéis pequenos, nunca destaques.
- Exif foi normalizado ao salvar. Orientação e tema foram conferidos visualmente nas pranchas; a checagem automática de Exif sozinha não constitui inspeção visual.

## Exemplos de rejeições

Confeitaria no lugar das fontes do Bellagio; hotel Elara no lugar da High Roller; gravura do Zócalo; barcos militares no lugar da baía bioluminescente; retratos dominando Riverwalk e jardim; panoramas esféricos deformados; imagens escuras e possíveis variantes do mesmo original. Nenhum desses candidatos foi aplicado.

## Validação

A leitura de alguns assets no workspace ficou bloqueada no sistema de arquivos. A validação foi executada em `/tmp/2go-validation-remote`: clone da mesma branch no commit anterior + as 958 fotos aprovadas (SHA-256 conferido contra o manifesto) + os scripts e manifesto desta continuação.

- `npm run audit:guide-images`: **FAIL — 14.019 ocorrências**. Saída integral: `audit-regional-checkpoint.txt`.
- 6.845 posições dos guias + nove suplementares; 6.854 paths únicos e 6.847 hashes locais únicos (as outras sete posições usam URLs remotas). Isso **não** torna as fontes originais únicas: a auditoria ainda denuncia repetições herdadas de fontes/famílias e todos os placeholders restantes.
- Inventário: 4.608 placeholders, 85 destinos ainda com placeholder, 4.617 posições sem aprovação visual herdada/atual. As nove suplementares sem aprovação não foram declaradas revisadas.
- A cobertura geográfica passou a incluir os destinos dos lotes regionais. Havaí usa limite do arquipélago (Oahu/Maui/Hawaii Island já previstos no guia), em vez de apenas 80 km de Honolulu; não foi alterado o catálogo.
- `npm run build`: **PASSOU** na mesma cópia verificada.

## Continuação obrigatória

Finalizar os 578 slots das Américas (bairros, regiões, hotéis ilustrativos, essentials/days/trips e candidatos rejeitados), depois Europa e Mundo. Resolver fontes repetidas preexistentes e os destaques residuais de Cancún/Bariloche. Só gerar entrega final e screenshots finais após placeholders=0 e auditoria verde. Não mergear sem aceite humano.

## Histórico de checkpoints

- `3ddbf03`: primeiras 452 substituições enviadas na mesma branch.
- Atualização seguinte: mais 43 fotos de apoio de Boston, total 495; 5.071 placeholders restantes.

- Passagem seguinte: 87 fotos de bairros aprovadas em 22 destinos; total 582, com 4.984 placeholders restantes.

- Passagem seguinte: 188 fotos de regioes e hospedagem aprovadas em 22 destinos; total 770, com 4.796 placeholders restantes.

## Protecoes adicionais do preparador

Candidatos ja rejeitados deixam de reaparecer automaticamente; reconsideracao exige titulo explicitamente indicado no plano e nova decisao visual. Postais, litografias e fontes com data de captura/publicacao anterior a 1990 sao filtrados por padrao, pois uploads recentes e muitos pixels nao comprovam uma foto atual. A regra pode ser explicitamente revisitada por plano, sem aprovar a imagem automaticamente.

A auditoria usa limites por assunto para passeios e ilhas ja previstos nos guias (Kennedy Space Center, Guatape, Saona, Culebra/Vieques, Exuma/Out Islands e ilhas do Havai), mantendo os limites de cidade para os demais slots. Coordenadas invalidas agora geram erro. Isso nao produz aceite global: a auditoria segue FAIL enquanto houver pendencias.

- Passagem seguinte: 188 fotos de apoio em 22 destinos; total 958, com 4.608 placeholders restantes. Build passou; audit FAIL com 14.019 ocorrências, nenhuma ligada aos 958 registros novos.

## Origem externa e validade dos candidatos

`source-origins.json` indexa metadados consultados de 2.112 posições reais, com 431 IDs externos Flickr comprovados pelo crédito da fonte. É uma camada adicional às verificações de URL, família e binário; crédito sem link comprovado não recebe ID inventado. Uma duplicata herdada em Gramado passou a ser denunciada. Nenhuma das 958 fotos novas conflita nessa camada. Isso não substitui inspeção visual nem comprova que todas as variantes possíveis foram detectadas.

O preparador e o aplicador bloqueiam IDs externos já usados. Testes: quatro casos de extração e bloqueio real da variante de Chicago (Flickr 9694666470), sem gravar no manifesto. Reservas entre candidatos impedem a escolha simultânea da mesma origem. Pranchas já aplicadas não podem ser sobrescritas por nova busca.

Rejeições adicionais: cédulas antigas, dólar falso com Papai Noel, visto chinês no slot de documento dos EUA, retratos em lugar de destinos, mapas de transporte e candidatos classificados como IA. As fotos de chegada de Lima mostravam o terminal antigo, fechado em 1/6/2025 conforme o [Ministério dos Transportes do Peru](https://www.gob.pe/institucion/mtc/noticias/1179258-antiguo-aeropuerto-jorge-chavez-cerro-su-ciclo-tras-movilizar-cerca-de-400-millones-de-pasajeros); continuam pendentes de substituição correta.
