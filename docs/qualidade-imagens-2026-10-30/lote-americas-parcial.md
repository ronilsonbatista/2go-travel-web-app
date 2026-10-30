# Américas — checkpoint parcial de imagens (30/10/2026)

**Não concluído. PR #34 continua draft. DO NOT MERGE.**

- Branch: `cursor/guia-imagens-qualidade-2026-10-30`; base original `c2e7504`.
- **582 / 5.566 placeholders substituídos** por fotos reais licenciadas, com decisão visual explícita.
- **4.984 placeholders restantes** (contagem absoluta; ponto usado como separador na tabela regional).
- Nenhuma ocorrência da auditoria envolve as 582 fotos novas; falhas herdadas permanecem abertas.
- 24 destinos tocados; São Francisco e Boston: 64/64 posições provisórias substituídas em cada cidade. Isso não equivale a uma aprovação global de todos os estados responsivos do site.
- Os 39 highlights anteriores foram preservados. Nenhuma fonte real anterior foi sobrescrita: os 582 registros alterados eram placeholders; paths e tópicos permaneceram idênticos.
- **Sem alteração de layout, CSS, conteúdo, catálogo, Admin, Core ou Flutter.**

| Região | Substituídos nesta continuação | Restantes |
| --- | ---: | ---: |
| Américas | 582 | 954 |
| Europa | 0 | 2.432 |
| Mundo | 0 | 1.598 |
| **Total** | **582** | **4.984** |

## Destinos tocados

| Destino / pasta | Substituídos | Ainda placeholder |
| --- | ---: | ---: |
| assuncao | 15 | 49 |
| bahamas | 15 | 49 |
| bogota | 21 | 43 |
| boston | 64 | 0 |
| chicago | 22 | 42 |
| cidade-do-mexico | 11 | 53 |
| cidade-do-panama | 25 | 39 |
| fernando-de-noronha | 29 | 35 |
| havai | 14 | 50 |
| havana | 22 | 42 |
| las-vegas | 22 | 42 |
| lima | 24 | 40 |
| los-angeles | 22 | 42 |
| medellin | 19 | 45 |
| montevideo | 23 | 41 |
| montreal | 25 | 39 |
| orlando | 25 | 39 |
| porto-rico | 23 | 41 |
| punta-cana | 16 | 48 |
| quito | 18 | 46 |
| san-andres | 12 | 52 |
| sao-francisco | 64 | 0 |
| toronto | 28 | 36 |
| vancouver | 23 | 41 |

## Revisão e rastreabilidade

- `sources.json`: autor, licença e URL da licença quando disponibilizada pela fonte, Commons File URL, título original, assunto, dimensões, hash SHA-256 e notas da inspeção.
- `regional-*/review.json`: candidatos e metadados consultados; **não significa aprovação**.
- `regional-*/decisions.json`: aceitação/rejeição explícita. `applied.json` registra o que foi efetivamente aplicado.
- `regional-rejections.json`: 192 decisões de rejeição nesta passagem; título, hash e motivo por tentativa (um candidato pode reaparecer em buscas diferentes).
- `regional-approved-sample.jpg`: amostra das fotos efetivamente aplicadas; contato editorial, **não captura final de produção**.
- O preparador separa busca/download de aprovação. O aplicador exige decisão explícita, licença reconhecida, autor, hash preservado, imagem decodificável >=1600 px no lado maior e fonte/família/binário únicos em relação ao manifesto atual.
- Exif foi normalizado ao salvar. Orientação e tema foram conferidos visualmente nas pranchas; a checagem automática de Exif sozinha não constitui inspeção visual.

## Exemplos de rejeições

Confeitaria no lugar das fontes do Bellagio; hotel Elara no lugar da High Roller; gravura do Zócalo; barcos militares no lugar da baía bioluminescente; retratos dominando Riverwalk e jardim; panoramas esféricos deformados; imagens escuras e possíveis variantes do mesmo original. Nenhum desses candidatos foi aplicado.

## Validação

A leitura de alguns assets no workspace ficou bloqueada no sistema de arquivos. A validação foi executada em `/tmp/2go-validation-remote`: clone da mesma branch no commit anterior + as 582 fotos aprovadas (SHA-256 conferido contra o manifesto) + os scripts e manifesto desta continuação.

- `npm run audit:guide-images`: **FAIL — 15.146 ocorrências**. Saída integral: `audit-regional-checkpoint.txt`.
- 6.845 posições dos guias + nove suplementares; 6.854 paths únicos e 6.847 hashes locais únicos (as outras sete posições usam URLs remotas). Isso **não** torna as fontes originais únicas: a auditoria ainda denuncia repetições herdadas de fontes/famílias e todos os placeholders restantes.
- Inventário: 4.984 placeholders, 85 destinos ainda com placeholder, 4.993 posições sem aprovação visual herdada/atual. As nove suplementares sem aprovação não foram declaradas revisadas.
- A cobertura geográfica passou a incluir os destinos dos lotes regionais. Havaí usa limite do arquipélago (Oahu/Maui/Hawaii Island já previstos no guia), em vez de apenas 80 km de Honolulu; não foi alterado o catálogo.
- `npm run build`: **PASSOU** na mesma cópia verificada.

## Continuação obrigatória

Finalizar os 954 slots das Américas (bairros, regiões, hotéis ilustrativos, essentials/days/trips e candidatos rejeitados), depois Europa e Mundo. Resolver fontes repetidas preexistentes e os destaques residuais de Cancún/Bariloche. Só gerar entrega final e screenshots finais após placeholders=0 e auditoria verde. Não mergear sem aceite humano.

## Histórico de checkpoints

- `3ddbf03`: primeiras 452 substituições enviadas na mesma branch.
- Atualização seguinte: mais 43 fotos de apoio de Boston, total 495; 5.071 placeholders restantes.

- Passagem seguinte: 87 fotos de bairros aprovadas em 22 destinos; total 582, com 4.984 placeholders restantes.
