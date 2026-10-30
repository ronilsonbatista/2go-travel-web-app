# Curadoria de imagens dos guias 2GO — 29/10/2026

Status: concluída para revisão humana dos prints. PR #28 aberta; sem merge.

PR: [#28](https://github.com/ronilsonbatista/2go-travel-web-app/pull/28)

Branch: `cursor/guia-imagens-curadoria-40d8` · base preservada: `8dcb3e4`.

- Roma: fotos reais e explícitas de Coliseu e Panteão; quatro essentials distintos, com euro, placa italiana, metrô e passaporte.
- Nova York: Empire State, Central Park, Times Square, Estátua da Liberdade, Brooklyn Bridge e High Line com arquivos próprios. Fotos diferentes também nos pins e na lista do mapa.
- Paris, Tóquio, Londres, Roma, Nova York, Istambul e Dubai: seis atrações por cidade; fotos próprias por posição de hero, mapa, regiões, hotéis, roteiro, bairros, essentials, custos e insights. Seleção por caminhos fixos; matching por palavras-chave removido.
- Home: capas, miniaturas do carrossel e cards de destino separados. Capa da Itália corrigida. Fallback de capa genérica em eventos sem foto própria removido; espaço visual preservado com marcador.
- 138 assets legados substituídos/removidos. Incluem `public/images/destinations/istambul/istambul-mesquita-azul.jpg` (Taj Mahal) e `public/images/destinations/istambul/istambul-bosforo.jpg` (Apple Watch). O hash conhecido do diner FOOD BANK permanece banido e não existe no diretório público. [Inventário completo de remoções](curadoria-2026-10-29/removed-assets.json).

Mapa atração/card → arquivo: [tabela completa, Roma e NY primeiro](curadoria-2026-10-29/image-map.md) · [JSON das 463 posições](curadoria-2026-10-29/slot-map.json). [Autoria, origem e licença das 449 fotos selecionadas](curadoria-2026-10-29/sources.json), também publicadas em `/creditos-imagens`.

Prova de unicidade: [saída do audit](curadoria-2026-10-29/audit.txt): 449 posições curadas + 14 fotos editoriais preexistentes; 463 paths distintos, 455 hashes locais distintos e oito URLs remotas distintas. A [checagem adicional incluindo os bytes remotos](curadoria-2026-10-29/site-wide-photo-audit.json) confirmou 463 hashes distintos e zero pares perceptuais candidatos. O audit também verifica arquivos ausentes, hashes banidos, origem repetida, famílias de cópias/recortes, tópico revisado e coordenadas disponíveis.

Validação: `npm run audit:guide-images`, `npm run build`, `npm test` e lint dos arquivos novos passaram. [Build](curadoria-2026-10-29/build.txt) · [Teste](curadoria-2026-10-29/test.txt) · [Lint](curadoria-2026-10-29/lint.txt). [25 estados de páginas/mapas](curadoria-2026-10-29/browser-states-audit.json), sem fotos quebradas ou duplicadas. [22 prints das sete cidades e da home](curadoria-2026-10-29/screenshots/README.md).

Arquivos principais: `src/data/guidesData.js`, `src/data/guideThirtySeconds.js`, `src/lib/guideVisuals.js`, `src/lib/guideInterior.js`, `src/lib/curatedGuideImages.js`, componentes dos guias, home/listagem, `scripts/audit-guide-images.mjs` e `scripts/guide-image-slots.mjs`. [Lista integral dos arquivos alterados](curadoria-2026-10-29/changed-files.txt).

Limites de revisão: o preview Vercel exige SSO; os prints são do build local do código da PR. Fotos de hotéis são contextuais dos bairros e mantêm “Imagem ilustrativa”. Deduplicação aplicada a fotos editoriais; marca, mapas funcionais, capturas do aplicativo e mídia fornecida por usuários permanecem fora desse inventário.

Checkout de entrega: `2go-travel-web-app.nosync`, dentro de `AppRoteiros`. A cópia sem sincronização foi necessária porque o macOS havia descarregado arquivos do checkout inicial para a nuvem. Usar esta cópia ou a branch atualizada da PR para continuar.
