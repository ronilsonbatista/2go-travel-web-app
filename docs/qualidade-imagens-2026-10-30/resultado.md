# Qualidade das imagens — trabalho parcial, NÃO aprovado

Base confirmada: `c2e7504d6ff1a2050329658eeba13e985a4713bf` (main após PR #33).
Branch: `cursor/guia-imagens-qualidade-2026-10-30`.

## Situação de aceite

- Inventário automatizado: 107 destinos, 6.845 slots de guias + 9 posições suplementares.
- Placeholders identificados: **5.566 em 87 destinos**. **Substituídos nesta etapa: 0/5.566**.
- Não declarar 107/107 revisados visualmente. Nenhuma aprovação global de orientação ou de correspondência de tema foi concedida.
- Audit global continua reprovado; não fazer merge desta etapa como conclusão da curadoria.

## Alterações efetivas

- 39 slots de destaque alterados: 30 recuperaram versões maiores da mesma foto; nove receberam fotos novas inspecionadas (inclui Paris/guide-highlight).
- Paris/hero: 960×303 → 2400×758, sem ampliar artificialmente a foto pequena; recuperado original Commons.
- Paris/guide-highlight: substituído reflexo invertido por panorama de Paris com Torre Eiffel na orientação normal, 2400×800. O usuário confirmou que este era o feedback “Paris-14”.
- Tóquio/hero: 960×540 → 2400×1350; mais quatro posições de destaque recuperadas em resolução maior.
- Substituições adicionais aceitas após contato visual: Buenos Aires, Amsterdã, Miami, Gramado, Santiago (duas), Florianópolis e Londres.
- Candidatas inadequadas rejeitadas: interior de cinema em Salvador, pessoas dominando a imagem de Maceió, foto histórica monocromática de Florianópolis, dois destaques fracos/antigos de Dubai e paisagem pouco expressiva do Rio.
- Sem mudanças de layout, conteúdo editorial ou catálogo.

## Auditoria

O comando original quebrava ao tentar desestruturar coordenadas de cidades não existentes em sua tabela de referência. Agora registra falta de cobertura geográfica como erro e continua a varredura; também denuncia explicitamente placeholders. Não foi relaxada a validação para produzir resultado verde.

No primeiro inventário havia 49 destaques abaixo de 1600 px e oito heroes abaixo de 1200 px. A contagem inclui as dimensões de assets provisórios e não constitui prova de qualidade fotográfica.

## Evidências

- `inventory.json`: dimensões, EXIF, hash e flags de todos os slots.
- `resolution-upgrades.json`: antes/depois das recuperações de resolução.
- `source-resolution-check.json`: consulta Commons dos originais pequenos (os 16 arquivos existem; não confundir com falha transitória de consulta).
- `prominent-candidates.json`: candidatas aceitas/rejeitadas e metadados de licença.
- `paris-contact-sheet.jpg`, `toquio-contact-sheet.jpg`: contato ANTES das alterações.
- `upgraded-review-sheet.jpg`: contato após recuperação de resolução e substituição do reflexo, antes das oito substituições adicionais.
- `prominent-candidates-review.jpg`: candidatas, incluindo imagens rejeitadas; não é uma galeria de aprovação.
- `paris-hero-local.jpg`, `toquio-hero-local.jpg`: capturas locais; não representam deploy de produção.

## Trabalho obrigatório ainda aberto

1. Substituir os 5.566 placeholders por fotos distintas, licenciadas e adequadas a cada tema.
2. Inspecionar atrações, bairros, hotel/region pins, essenciais e dias de roteiro dos 107 guias. Dimensões e hash não comprovam o tema.
3. Resolver duplicatas de fonte/família já denunciadas pela auditoria, sem reutilizar versões recortadas da mesma foto.
4. Completar a cobertura geográfica da auditoria para as cidades novas.
5. Substituir os destaques pequenos restantes (Cancún/Bariloche e candidatas rejeitadas, entre outros).
6. Realizar revisão de orientação/crop do catálogo inteiro e fornecer amostras antes→depois dos lotes regionais.
7. Só então buscar audit verde e aceite humano. O build verde, sozinho, não valida as fotos.

## Slots alterados

- `paris/hero` — [2400, 758]; File:Paris Night.jpg
- `paris/home` — [2400, 822]; File:Panorama view of Paris, 27 August 2019.jpg
- `paris/guide-card` — [2400, 1264]; File:15th Arrondissement of Paris as seen from Pont de Bir-Hakeim 140507 1.jpg
- `paris/guide-highlight` — [2400, 800]; File:Panorama Paris Montparnasse.jpg
- `paris/home-slide` — [2400, 625]; File:Les toits de Paris, panorama - août 2015.jpg
- `nova-york/hero` — [2400, 1866]; File:Central_Park_-_The_Pond_(48377220157).jpg
- `nova-york/home` — [2400, 665]; File:Manhattan from Weehawken, NJ.jpg
- `nova-york/guide-card` — [2400, 1200]; File:Lower Manhattan from Jersey City September 2020 panorama.jpg
- `nova-york/guide-highlight` — [1600, 2400]; File:Midtown Manhattan from Jersey City September 2020 HDR.jpg
- `nova-york/home-slide` — [2400, 960]; File:Lower Manhattan from Jersey City November 2014 panorama 2.jpg
- `toquio/hero` — [2400, 1350]; File:Tokyo Tower, Minato City.jpg
- `toquio/home` — [2400, 1350]; File:Minato City, Tokyo, Japan.jpg
- `toquio/guide-card` — [2400, 1350]; File:Minato City, Tokyo, Japan (Night).jpg
- `toquio/guide-highlight` — [2400, 1600]; File:Tokyo skyline seen from Tokyo Skytree.jpg
- `toquio/home-slide` — [2048, 1366]; File:Tokyo Skyline20210123.jpg
- `londres/hero` — [2400, 1180]; File:London Skyline from Waterloo Bridge, London, UK - Diliff.jpg
- `londres/home` — [2400, 1327]; File:City of London skyline from London City Hall - Sept 2015 - Crop Aligned.jpg
- `londres/guide-card` — [2400, 1327]; File:City of London skyline from London City Hall - Oct 2008 - Aligned.jpg
- `londres/guide-highlight` — [2400, 1375]; File:Thames and London Eye from Westminster Bridge.jpg
- `roma/hero` — [2400, 1772]; File:Pantheon_Rom_1_cropped.jpg
- `roma/home` — [2400, 1580]; File:Piazza_Venezia_-_Il_Vittoriano_(cropped).jpg
- `roma/guide-card` — [2400, 1595]; File:Trevi_Fountain,_Rome,_Italy_2_-_May_2007.jpg
- `roma/guide-highlight` — [2400, 1600]; File:Palatine_Hill_from_across_the_Circus_Maximus_April_2019.jpg
- `roma/home-slide` — [2400, 1596]; File:Panorama of Rome 1.JPG
- `istambul/hero` — [2400, 1071]; File:Panoramic view of Istanbul- Yeni Cami (The New Mosque), Galata Bridge. Turkey, Southeastern Europe.jpg
- `istambul/home` — [2400, 1688]; File:Blue Mosque Courtyard Dusk Wikimedia Commons.jpg
- `istambul/guide-card` — [2400, 1800]; File:Panorama-view-Istanbul-October-2012.jpg
- `istambul/guide-highlight` — [2400, 1094]; File:Istanbul panorama from Galata tower - 1.jpg
- `istambul/home-slide` — [2400, 785]; File:Entrance to Dolmabahçe Palace, Architectural Panorama.jpg
- `dubai/hero` — [2400, 1600]; File:Dubai skyline unsplash.jpg
- `dubai/home` — [2400, 1600]; File:Dubai Skyline 2016.jpg
- `buenos-aires/guide-highlight` — [2400, 609]; File:193 - Buenos Aires - Puerto Madero - Janvier 2010.jpg
- `amsterdam/home-slide` — [2400, 1181]; File:Amsterdam, nábřeží kanálu.jpg
- `miami/home` — [2400, 938]; File:Downtown Miami Skyline (Southern View).jpg
- `gramado/home` — [2400, 1349]; File:Gramado-RS 2012 Nokia N8 - panoramio.jpg
- `santiago/hero` — [2400, 906]; File:2013 Santiago skyline.jpg
- `santiago/guide-card` — [2400, 1800]; File:2017 Santiago de Chile - Barrio de San Isidro y avenida Alameda desde el mirador del Cerro de Santa Lucía.jpg
- `florianopolis/home-slide` — [2400, 1600]; File:Hercílio Luz Florianópolis.jpg
- `londres/home-slide` — [2400, 1607]; File:Across the River Thames, London - geograph.org.uk - 2196474.jpg

## Validação final desta etapa

- `npm run build`: PASSOU (após todas as 39 alterações).
- `npm run audit:guide-images`: REPROVADO; saída integral em `audit-after.txt`.
- Destaques abaixo de 1600 px: 49 → 10. Heroes abaixo de 1200 px: 8 → 0. A dimensão não torna placeholders fotografias reais.
- Placeholders substituídos: **0/5.566**.
- Capturas locais verificadas de Paris e Tóquio; nenhuma publicação em produção.
