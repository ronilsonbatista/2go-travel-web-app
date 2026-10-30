# Américas — checkpoint parcial de imagens (30/10/2026)

**Não concluído. PR #34 continua draft. DO NOT MERGE.**

- Branch: `cursor/guia-imagens-qualidade-2026-10-30`; base original `c2e7504`.
- **452 / 5.566 placeholders substituídos** por fotos reais licenciadas, com decisão visual explícita.
- **5,114 placeholders restantes** (contagem absoluta; ponto usado como separador na tabela regional).
- Nenhuma ocorrência da auditoria envolve as 452 fotos novas; falhas herdadas permanecem abertas.
- 24 destinos tocados; São Francisco: 64/64 posições provisórias substituídas. Isso não equivale a uma aprovação global de todos os estados responsivos do site.
- Os 39 highlights anteriores foram preservados. Nenhuma fonte real anterior foi sobrescrita: os 452 registros alterados eram placeholders; paths e tópicos permaneceram idênticos.
- **Sem alteração de layout, CSS, conteúdo, catálogo, Admin, Core ou Flutter.**

| Região | Substituídos nesta continuação | Restantes |
| --- | ---: | ---: |
| Américas | 452 | 1.084 |
| Europa | 0 | 2.432 |
| Mundo | 0 | 1.598 |
| **Total** | **452** | **5.114** |

## Destinos tocados

| Destino / pasta | Substituídos | Ainda placeholder |
| --- | ---: | ---: |
| assuncao | 11 | 53 |
| bahamas | 12 | 52 |
| bogota | 18 | 46 |
| boston | 21 | 43 |
| chicago | 20 | 44 |
| cidade-do-mexico | 9 | 55 |
| cidade-do-panama | 20 | 44 |
| fernando-de-noronha | 23 | 41 |
| havai | 9 | 55 |
| havana | 19 | 45 |
| las-vegas | 19 | 45 |
| lima | 20 | 44 |
| los-angeles | 18 | 46 |
| medellin | 14 | 50 |
| montevideo | 17 | 47 |
| montreal | 21 | 43 |
| orlando | 20 | 44 |
| porto-rico | 18 | 46 |
| punta-cana | 12 | 52 |
| quito | 14 | 50 |
| san-andres | 11 | 53 |
| sao-francisco | 64 | 0 |
| toronto | 23 | 41 |
| vancouver | 19 | 45 |

## Revisão e rastreabilidade

- `sources.json`: autor, licença e URL da licença quando disponibilizada pela fonte, Commons File URL, título original, assunto, dimensões, hash SHA-256 e notas da inspeção.
- `regional-*/review.json`: candidatos e metadados consultados; **não significa aprovação**.
- `regional-*/decisions.json`: aceitação/rejeição explícita. `applied.json` registra o que foi efetivamente aplicado.
- `regional-rejections.json`: 95 candidatos rejeitados nesta passagem; motivo por posição.
- `regional-approved-sample.jpg`: amostra das fotos efetivamente aplicadas; contato editorial, **não captura final de produção**.
- O preparador separa busca/download de aprovação. O aplicador exige decisão explícita, licença reconhecida, autor, hash preservado, imagem decodificável >=1600 px no lado maior e fonte/família/binário únicos em relação ao manifesto atual.
- Exif foi normalizado ao salvar. Orientação e tema foram conferidos visualmente nas pranchas; a checagem automática de Exif sozinha não constitui inspeção visual.

## Exemplos de rejeições

Confeitaria no lugar das fontes do Bellagio; hotel Elara no lugar da High Roller; gravura do Zócalo; barcos militares no lugar da baía bioluminescente; retratos dominando Riverwalk e jardim; panoramas esféricos deformados; imagens escuras e possíveis variantes do mesmo original. Nenhum desses candidatos foi aplicado.

## Validação

A leitura de alguns assets no workspace ficou bloqueada no sistema de arquivos. A validação foi executada em `/tmp/2go-validation-remote`: clone da mesma branch no commit anterior + as 452 fotos aprovadas (SHA-256 conferido contra o manifesto) + os scripts e manifesto desta continuação.

- `npm run audit:guide-images`: **FAIL — 15.536 ocorrências**. Saída integral: `audit-regional-checkpoint.txt`.
- 6.845 posições dos guias + nove suplementares; 6.854 paths únicos e 6.847 hashes locais únicos (as outras sete posições usam URLs remotas). Isso **não** torna as fontes originais únicas: a auditoria ainda denuncia repetições herdadas de fontes/famílias e todos os placeholders restantes.
- Inventário: 5.114 placeholders, 86 destinos ainda com placeholder, 5.123 posições sem aprovação visual herdada/atual. As nove suplementares sem aprovação não foram declaradas revisadas.
- A cobertura geográfica passou a incluir os destinos dos lotes regionais. Havaí usa limite do arquipélago (Oahu/Maui/Hawaii Island já previstos no guia), em vez de apenas 80 km de Honolulu; não foi alterado o catálogo.
- `npm run build`: **PASSOU** na mesma cópia verificada.

## Continuação obrigatória

Finalizar os 1.084 slots das Américas (bairros, regiões, hotéis ilustrativos, essentials/days/trips e candidatos rejeitados), depois Europa e Mundo. Resolver fontes repetidas preexistentes e os destaques residuais de Cancún/Bariloche. Só gerar entrega final e screenshots finais após placeholders=0 e auditoria verde. Não mergear sem aceite humano.
