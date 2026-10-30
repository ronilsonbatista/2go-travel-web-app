/**
 * Master destinations catalog for /guias “Ver todos” + Home filters.
 * Deduped (case/accents): Milano→Milão, Zurich→Zurique; Santiago & Punta Cana once.
 * `status: 'published'` when a full guide exists in guidesData.
 */

export function normalizeDestinationKey(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** @typedef {{
 *  id: string,
 *  city: string,
 *  country: string,
 *  region: string,
 *  tags: string[],
 *  desc: string,
 *  slug?: string,
 *  status: 'published' | 'planned',
 *  batch?: 'existing' | 'A' | 'B' | 'cms'
 * }} DestinationEntry
 */

/** @type {DestinationEntry[]} */
export const DESTINATIONS_CATALOG = [
  // —— Existing published guides ——
  { id: 'paris', city: 'Paris', country: 'França', region: 'Europa', tags: ['cidade', 'europa', 'cultura', 'romantico'], desc: 'Documentos, metrô, arrondissements e o que reservar antes.', slug: 'como-planejar-viagem-paris', status: 'published', batch: 'existing' },
  { id: 'nova-york', city: 'Nova York', country: 'Estados Unidos', region: 'América do Norte', tags: ['cidade', 'urbano', 'cultura'], desc: 'Visto, OMNY, bairros e o essencial da primeira visita.', slug: 'como-planejar-viagem-nova-york', status: 'published', batch: 'existing' },
  { id: 'toquio', city: 'Tóquio', country: 'Japão', region: 'Ásia', tags: ['cidade', 'asia', 'cultura', 'tecnologia'], desc: 'Trem, bairros e o ritmo do dia a dia no Japão.', slug: 'como-planejar-viagem-toquio', status: 'published', batch: 'existing' },
  { id: 'londres', city: 'Londres', country: 'Reino Unido', region: 'Europa', tags: ['cidade', 'europa', 'cultura'], desc: 'ETA, Tube, museus e uma ideia real de custo.', slug: 'como-planejar-viagem-londres', status: 'published', batch: 'existing' },
  { id: 'roma', city: 'Roma', country: 'Itália', region: 'Europa', tags: ['cidade', 'europa', 'cultura', 'historia'], desc: 'Coliseu, Vaticano, onde ficar e como evitar filas.', slug: 'como-planejar-viagem-roma', status: 'published', batch: 'existing' },
  { id: 'istambul', city: 'Istambul', country: 'Turquia', region: 'Oriente Médio', tags: ['cidade', 'oriente-medio', 'cultura'], desc: 'Bósforo, bairros e o lado europeu vs asiático.', slug: 'como-planejar-viagem-istambul', status: 'published', batch: 'existing' },
  { id: 'dubai', city: 'Dubai', country: 'Emirados Árabes Unidos', region: 'Oriente Médio', tags: ['cidade', 'oriente-medio', 'luxo'], desc: 'Visto, calor, Burj Khalifa e o que pesa no orçamento.', slug: 'como-planejar-viagem-dubai', status: 'published', batch: 'existing' },

  // —— Batch A ——
  { id: 'rio-de-janeiro', city: 'Rio de Janeiro', country: 'Brasil', region: 'América do Sul', tags: ['praia', 'cidade', 'brasil', 'natureza'], desc: 'Cristo, Pão de Açúcar, praias e logística na cidade maravilhosa.', slug: 'como-planejar-viagem-rio-de-janeiro', status: 'published', batch: 'A' },
  { id: 'sydney', city: 'Sydney', country: 'Austrália', region: 'Oceania', tags: ['praia', 'cidade', 'oceania'], desc: 'Opera House, harbour e o ritmo da costa australiana.', status: 'planned', batch: 'A' },
  { id: 'bangkok', city: 'Bangkok', country: 'Tailândia', region: 'Ásia', tags: ['cidade', 'asia', 'cultura', 'gastronomia'], desc: 'Templos, street food e como circular na capital tailandesa.', status: 'planned', batch: 'A' },
  { id: 'amsterdam', city: 'Amsterdã', country: 'Países Baixos', region: 'Europa', tags: ['cidade', 'europa', 'cultura'], desc: 'Canais, museus, bicicleta e o essencial da Holanda.', slug: 'como-planejar-viagem-amsterdam', status: 'published', batch: 'A' },
  { id: 'gramado', city: 'Gramado', country: 'Brasil', region: 'América do Sul', tags: ['cidade', 'brasil', 'natureza', 'romantico'], desc: 'Serra Gaúcha, chocolate, clima europeu e roteiro de inverno/verão.', slug: 'como-planejar-viagem-gramado', status: 'published', batch: 'A' },
  { id: 'buenos-aires', city: 'Buenos Aires', country: 'Argentina', region: 'América do Sul', tags: ['cidade', 'cultura', 'gastronomia'], desc: 'Tango, bairros, carne e o charme portenho.', slug: 'como-planejar-viagem-buenos-aires', status: 'published', batch: 'A' },
  { id: 'orlando', city: 'Orlando', country: 'Estados Unidos', region: 'América do Norte', tags: ['familia', 'parques', 'urbano'], desc: 'Parques, traslado e como organizar dias sem sobrecarga.', slug: 'como-planejar-viagem-orlando', status: 'published', batch: 'A' },
  { id: 'lisboa', city: 'Lisboa', country: 'Portugal', region: 'Europa', tags: ['cidade', 'europa', 'cultura', 'gastronomia'], desc: 'Colinas, elétricos, Belém e o jeito português de viajar.', slug: 'como-planejar-viagem-lisboa', status: 'published', batch: 'A' },
  { id: 'cancun', city: 'Cancún', country: 'México', region: 'América do Norte', tags: ['praia', 'caribe', 'resort'], desc: 'Zona Hotelera, cenotes e o Caribe mexicano.', slug: 'como-planejar-viagem-cancun', status: 'published', batch: 'A' },
  { id: 'santiago', city: 'Santiago', country: 'Chile', region: 'América do Sul', tags: ['cidade', 'natureza', 'montanha'], desc: 'Andes, vinícolas e a capital chilena em poucos dias.', slug: 'como-planejar-viagem-santiago', status: 'published', batch: 'A' },
  { id: 'ibiza', city: 'Ibiza', country: 'Espanha', region: 'Europa', tags: ['praia', 'europa', 'nightlife'], desc: 'Praias, vida noturna e o lado calmo da ilha.', slug: 'como-planejar-viagem-ibiza', status: 'published', batch: 'A' },
  { id: 'sao-paulo', city: 'São Paulo', country: 'Brasil', region: 'América do Sul', tags: ['cidade', 'brasil', 'gastronomia', 'urbano'], desc: 'Gastronomia, bairros e o ritmo da maior metrópole do Brasil.', slug: 'como-planejar-viagem-sao-paulo', status: 'published', batch: 'A' },
  { id: 'maceio', city: 'Maceió', country: 'Brasil', region: 'América do Sul', tags: ['praia', 'brasil', 'natureza'], desc: 'Piscinas naturais, litoral alagoano e bate-voltas.', slug: 'como-planejar-viagem-maceio', status: 'published', batch: 'A' },
  { id: 'salvador', city: 'Salvador', country: 'Brasil', region: 'América do Sul', tags: ['praia', 'cidade', 'brasil', 'cultura'], desc: 'Pelourinho, axé, culinária baiana e orla.', slug: 'como-planejar-viagem-salvador', status: 'published', batch: 'A' },
  { id: 'florianopolis', city: 'Florianópolis', country: 'Brasil', region: 'América do Sul', tags: ['praia', 'brasil', 'natureza'], desc: 'Ilha da Magia: praias, lagoa e logística entre norte e sul.', slug: 'como-planejar-viagem-florianopolis', status: 'published', batch: 'A' },
  { id: 'punta-cana', city: 'Punta Cana', country: 'República Dominicana', region: 'América do Norte', tags: ['praia', 'caribe', 'resort'], desc: 'All-inclusive, praias e o Caribe dominicano.', slug: 'como-planejar-viagem-punta-cana', status: 'published', batch: 'A' },
  { id: 'bariloche', city: 'Bariloche', country: 'Argentina', region: 'América do Sul', tags: ['natureza', 'montanha', 'inverno'], desc: 'Lagos, chocolate e a Patagônia argentina.', slug: 'como-planejar-viagem-bariloche', status: 'published', batch: 'A' },
  { id: 'san-andres', city: 'San Andrés', country: 'Colômbia', region: 'América do Sul', tags: ['praia', 'caribe', 'natureza'], desc: 'Mar de sete cores e o Caribe colombiano.', slug: 'como-planejar-viagem-san-andres', status: 'published', batch: 'A' },
  { id: 'miami', city: 'Miami', country: 'Estados Unidos', region: 'América do Norte', tags: ['praia', 'cidade', 'urbano'], desc: 'South Beach, Wynwood e o sul da Flórida.', slug: 'como-planejar-viagem-miami', status: 'published', batch: 'A' },
  { id: 'los-angeles', city: 'Los Angeles', country: 'Estados Unidos', region: 'América do Norte', tags: ['cidade', 'praia', 'urbano'], desc: 'Hollywood, Santa Monica e o carro como base.', slug: 'como-planejar-viagem-los-angeles', status: 'published', batch: 'A' },
  { id: 'sao-francisco', city: 'São Francisco', country: 'Estados Unidos', region: 'América do Norte', tags: ['cidade', 'cultura', 'urbano'], desc: 'Golden Gate, cable cars e a Bay Area.', slug: 'como-planejar-viagem-sao-francisco', status: 'published', batch: 'A' },
  { id: 'hong-kong', city: 'Hong Kong', country: 'China', region: 'Ásia', tags: ['cidade', 'asia', 'urbano', 'gastronomia'], desc: 'Skyline, dim sum e ilhas ao redor.', status: 'planned', batch: 'A' },
  { id: 'macau', city: 'Macau', country: 'China', region: 'Ásia', tags: ['cidade', 'asia', 'cultura'], desc: 'Herança portuguesa, cassinos e day trip de HK.', status: 'planned', batch: 'A' },
  { id: 'meca', city: 'Meca', country: 'Arábia Saudita', region: 'Oriente Médio', tags: ['oriente-medio', 'cultura', 'religioso'], desc: 'Planejamento especial para a cidade sagrada.', status: 'planned', batch: 'A' },
  { id: 'antalya', city: 'Antalya', country: 'Turquia', region: 'Oriente Médio', tags: ['praia', 'oriente-medio', 'historia'], desc: 'Costa turquesa, ruínas e resorts.', status: 'planned', batch: 'A' },
  { id: 'kuala-lumpur', city: 'Kuala Lumpur', country: 'Malásia', region: 'Ásia', tags: ['cidade', 'asia', 'gastronomia'], desc: 'Petronas, street food e o hub malaio.', status: 'planned', batch: 'A' },
  { id: 'milao', city: 'Milão', country: 'Itália', region: 'Europa', tags: ['cidade', 'europa', 'moda', 'cultura'], desc: 'Duomo, moda e porta de entrada para o norte da Itália.', slug: 'como-planejar-viagem-milao', status: 'published', batch: 'A' },
  { id: 'florenca', city: 'Florença', country: 'Itália', region: 'Europa', tags: ['cidade', 'europa', 'cultura', 'historia'], desc: 'Renascimento, Uffizi e a Toscana a pé.', slug: 'como-planejar-viagem-florenca', status: 'published', batch: 'A' },
  { id: 'barcelona', city: 'Barcelona', country: 'Espanha', region: 'Europa', tags: ['cidade', 'europa', 'praia', 'cultura'], desc: 'Gaudí, praia urbana e o ritmo catalão.', slug: 'como-planejar-viagem-barcelona', status: 'published', batch: 'A' },
  { id: 'singapura', city: 'Singapura', country: 'Singapura', region: 'Ásia', tags: ['cidade', 'asia', 'urbano', 'gastronomia'], desc: 'Marina Bay, hawker centers e a cidade-estado.', status: 'planned', batch: 'A' },
  { id: 'seul', city: 'Seul', country: 'Coreia do Sul', region: 'Ásia', tags: ['cidade', 'asia', 'cultura', 'tecnologia'], desc: 'Palácios, K-culture e metrô impecável.', status: 'planned', batch: 'A' },
  { id: 'cairo', city: 'Cairo', country: 'Egito', region: 'África', tags: ['cidade', 'africa', 'historia'], desc: 'Pirâmides, Museu Egípcio e o Nilo.', status: 'planned', batch: 'A' },
  { id: 'cidade-do-cabo', city: 'Cidade do Cabo', country: 'África do Sul', region: 'África', tags: ['cidade', 'africa', 'natureza', 'praia'], desc: 'Table Mountain, vinícolas e a ponta da África.', status: 'planned', batch: 'A' },
  { id: 'joanesburgo', city: 'Joanesburgo', country: 'África do Sul', region: 'África', tags: ['cidade', 'africa', 'cultura'], desc: 'História, Soweto e porta para safáris.', status: 'planned', batch: 'A' },

  // —— Batch B ——
  { id: 'munique', city: 'Munique', country: 'Alemanha', region: 'Europa', tags: ['cidade', 'europa', 'cultura'], desc: 'Baviera, cervejarias e Alpes próximos.', slug: 'como-planejar-viagem-munique', status: 'published', batch: 'B' },
  { id: 'berlim', city: 'Berlim', country: 'Alemanha', region: 'Europa', tags: ['cidade', 'europa', 'cultura', 'historia'], desc: 'Muro, museus e a capital alemã.', slug: 'como-planejar-viagem-berlim', status: 'published', batch: 'B' },
  { id: 'pequim', city: 'Pequim', country: 'China', region: 'Ásia', tags: ['cidade', 'asia', 'historia', 'cultura'], desc: 'Cidade Proibida, Muralha e hutongs.', status: 'planned', batch: 'B' },
  { id: 'moscou', city: 'Moscou', country: 'Rússia', region: 'Europa', tags: ['cidade', 'europa', 'cultura'], desc: 'Kremlin, metrô e a capital russa.', slug: 'como-planejar-viagem-moscou', status: 'published', batch: 'B' },
  { id: 'sao-petersburgo', city: 'São Petersburgo', country: 'Rússia', region: 'Europa', tags: ['cidade', 'europa', 'cultura', 'historia'], desc: 'Ermitage, canais e noites brancas.', slug: 'como-planejar-viagem-sao-petersburgo', status: 'published', batch: 'B' },
  { id: 'oslo', city: 'Oslo', country: 'Noruega', region: 'Europa', tags: ['cidade', 'europa', 'natureza'], desc: 'Fiordes próximos e a capital nórdica.', slug: 'como-planejar-viagem-oslo', status: 'published', batch: 'B' },
  { id: 'bruxelas', city: 'Bruxelas', country: 'Bélgica', region: 'Europa', tags: ['cidade', 'europa', 'gastronomia'], desc: 'Grand-Place, chocolate e cervejas.', slug: 'como-planejar-viagem-bruxelas', status: 'published', batch: 'B' },
  { id: 'jerusalem', city: 'Jerusalém', country: 'Israel', region: 'Oriente Médio', tags: ['cidade', 'oriente-medio', 'historia', 'religioso'], desc: 'Cidade Antiga e camadas de história.', status: 'planned', batch: 'B' },
  { id: 'budapeste', city: 'Budapeste', country: 'Hungria', region: 'Europa', tags: ['cidade', 'europa', 'cultura'], desc: 'Termas, Danúbio e o charme magiar.', slug: 'como-planejar-viagem-budapeste', status: 'published', batch: 'B' },
  { id: 'porto', city: 'Porto', country: 'Portugal', region: 'Europa', tags: ['cidade', 'europa', 'gastronomia', 'cultura'], desc: 'Ribeira, vinho do Porto e o Douro.', slug: 'como-planejar-viagem-porto', status: 'published', batch: 'B' },
  { id: 'quioto', city: 'Quioto', country: 'Japão', region: 'Ásia', tags: ['cidade', 'asia', 'cultura', 'historia'], desc: 'Templos, gueixas e o Japão clássico.', status: 'planned', batch: 'B' },
  { id: 'vancouver', city: 'Vancouver', country: 'Canadá', region: 'América do Norte', tags: ['cidade', 'natureza', 'urbano'], desc: 'Montanhas, oceano e a costa do Pacífico.', slug: 'como-planejar-viagem-vancouver', status: 'published', batch: 'B' },
  { id: 'toronto', city: 'Toronto', country: 'Canadá', region: 'América do Norte', tags: ['cidade', 'urbano', 'cultura'], desc: 'CN Tower, diversity e Ontário.', slug: 'como-planejar-viagem-toronto', status: 'published', batch: 'B' },
  { id: 'montreal', city: 'Montreal', country: 'Canadá', region: 'América do Norte', tags: ['cidade', 'cultura', 'gastronomia'], desc: 'Francofonia, inverno e festival vibe.', slug: 'como-planejar-viagem-montreal', status: 'published', batch: 'B' },
  { id: 'chiang-mai', city: 'Chiang Mai', country: 'Tailândia', region: 'Ásia', tags: ['cidade', 'asia', 'cultura', 'natureza'], desc: 'Templos do norte e natureza ao redor.', status: 'planned', batch: 'B' },
  { id: 'copenhague', city: 'Copenhague', country: 'Dinamarca', region: 'Europa', tags: ['cidade', 'europa', 'design'], desc: 'Design, bicicletas e hygge dinamarquês.', slug: 'como-planejar-viagem-copenhague', status: 'published', batch: 'B' },
  { id: 'melbourne', city: 'Melbourne', country: 'Austrália', region: 'Oceania', tags: ['cidade', 'oceania', 'cultura', 'gastronomia'], desc: 'Cafés, laneways e a costa de Victoria.', status: 'planned', batch: 'B' },
  { id: 'marraquexe', city: 'Marraquexe', country: 'Marrocos', region: 'África', tags: ['cidade', 'africa', 'cultura'], desc: 'Medina, souks e o Atlas próximo.', status: 'planned', batch: 'B' },
  { id: 'tel-aviv', city: 'Tel Aviv', country: 'Israel', region: 'Oriente Médio', tags: ['cidade', 'oriente-medio', 'praia', 'urbano'], desc: 'Praia, bauhaus e vida noturna.', status: 'planned', batch: 'B' },
  { id: 'auckland', city: 'Auckland', country: 'Nova Zelândia', region: 'Oceania', tags: ['cidade', 'oceania', 'natureza'], desc: 'Porta de entrada para a Nova Zelândia.', status: 'planned', batch: 'B' },
  { id: 'varsovia', city: 'Varsóvia', country: 'Polônia', region: 'Europa', tags: ['cidade', 'europa', 'historia'], desc: 'Cidade Velha reconstruída e história polonesa.', slug: 'como-planejar-viagem-varsovia', status: 'published', batch: 'B' },
  { id: 'estocolmo', city: 'Estocolmo', country: 'Suécia', region: 'Europa', tags: ['cidade', 'europa', 'design'], desc: 'Ilhas, design e o arquipélago sueco.', slug: 'como-planejar-viagem-estocolmo', status: 'published', batch: 'B' },
  { id: 'reykjavik', city: 'Reykjavik', country: 'Islândia', region: 'Europa', tags: ['cidade', 'europa', 'natureza'], desc: 'Capital da Islândia e porta para a Ring Road.', slug: 'como-planejar-viagem-reykjavik', status: 'published', batch: 'B' },
  { id: 'atenas', city: 'Atenas', country: 'Grécia', region: 'Europa', tags: ['cidade', 'europa', 'historia'], desc: 'Acrópole, taverna e ilhas próximas.', slug: 'como-planejar-viagem-atenas', status: 'published', batch: 'B' },
  { id: 'mykonos', city: 'Mykonos', country: 'Grécia', region: 'Europa', tags: ['praia', 'europa', 'nightlife'], desc: 'Ciclades, casas brancas e vida noturna.', slug: 'como-planejar-viagem-mykonos', status: 'published', batch: 'B' },
  { id: 'malta', city: 'Malta', country: 'Malta', region: 'Europa', tags: ['praia', 'europa', 'historia'], desc: 'Ilhas históricas no Mediterrâneo.', slug: 'como-planejar-viagem-malta', status: 'published', batch: 'B' },
  { id: 'monaco', city: 'Monaco', country: 'Mônaco', region: 'Europa', tags: ['cidade', 'europa', 'luxo'], desc: 'Cassino, F1 e a Côte d’Azur.', slug: 'como-planejar-viagem-monaco', status: 'published', batch: 'B' },
  { id: 'riviera-francesa', city: 'Riviera Francesa', country: 'França', region: 'Europa', tags: ['praia', 'europa', 'luxo'], desc: 'Nice, Cannes e a Côte d’Azur.', slug: 'como-planejar-viagem-riviera-francesa', status: 'published', batch: 'B' },
  { id: 'riviera-espanhola', city: 'Riviera Espanhola', country: 'Espanha', region: 'Europa', tags: ['praia', 'europa'], desc: 'Costa do Sol e o Mediterrâneo espanhol.', slug: 'como-planejar-viagem-riviera-espanhola', status: 'published', batch: 'B' },
  { id: 'costa-amalfitana', city: 'Costa Amalfitana', country: 'Itália', region: 'Europa', tags: ['praia', 'europa', 'romantico'], desc: 'Positano, Amalfi e o litoral italiano.', slug: 'como-planejar-viagem-costa-amalfitana', status: 'published', batch: 'B' },
  { id: 'cinque-terre', city: 'Cinque Terre', country: 'Itália', region: 'Europa', tags: ['praia', 'europa', 'natureza'], desc: 'As Cinco Terras: trilhas e vilarejos coloridos.', slug: 'como-planejar-viagem-cinque-terre', status: 'published', batch: 'B' },
  { id: 'sardenha', city: 'Sardenha', country: 'Itália', region: 'Europa', tags: ['praia', 'europa', 'natureza'], desc: 'Praias cristalinas e interior sardo.', slug: 'como-planejar-viagem-sardenha', status: 'published', batch: 'B' },
  { id: 'sicilia', city: 'Sicília', country: 'Itália', region: 'Europa', tags: ['praia', 'europa', 'cultura', 'gastronomia'], desc: 'Etna, ruínas e a maior ilha italiana.', slug: 'como-planejar-viagem-sicilia', status: 'published', batch: 'B' },
  { id: 'dubrovnik', city: 'Dubrovnik', country: 'Croácia', region: 'Europa', tags: ['cidade', 'europa', 'praia', 'historia'], desc: 'Muralhas adriáticas e a Pérola do Adriático.', slug: 'como-planejar-viagem-dubrovnik', status: 'published', batch: 'B' },
  { id: 'budva', city: 'Budva', country: 'Montenegro', region: 'Europa', tags: ['praia', 'europa'], desc: 'Riviera montenegrina e cidade antiga.', slug: 'como-planejar-viagem-budva', status: 'published', batch: 'B' },
  { id: 'zurique', city: 'Zurique', country: 'Suíça', region: 'Europa', tags: ['cidade', 'europa', 'natureza'], desc: 'Lagos, trens e a porta da Suíça.', slug: 'como-planejar-viagem-zurique', status: 'published', batch: 'B' },
  { id: 'genebra', city: 'Genebra', country: 'Suíça', region: 'Europa', tags: ['cidade', 'europa'], desc: 'Lago Léman e organizações internacionais.', slug: 'como-planejar-viagem-genebra', status: 'published', batch: 'B' },
  { id: 'interior-suica', city: 'Interior da Suíça', country: 'Suíça', region: 'Europa', tags: ['natureza', 'europa', 'montanha'], desc: 'Alpes, vilarejos e trilhas suíças.', slug: 'como-planejar-viagem-interior-suica', status: 'published', batch: 'B' },
  { id: 'andorra', city: 'Andorra', country: 'Andorra', region: 'Europa', tags: ['montanha', 'europa', 'inverno'], desc: 'Esqui e compras nos Pirineus.', slug: 'como-planejar-viagem-andorra', status: 'published', batch: 'B' },
  { id: 'lima', city: 'Lima', country: 'Peru', region: 'América do Sul', tags: ['cidade', 'gastronomia', 'cultura'], desc: 'Capital gastronômica e porta para Machu Picchu.', slug: 'como-planejar-viagem-lima', status: 'published', batch: 'B' },
  { id: 'montevideo', city: 'Montevidéu', country: 'Uruguai', region: 'América do Sul', tags: ['cidade', 'praia'], desc: 'Rambla, carne e o charme uruguaio.', slug: 'como-planejar-viagem-montevideo', status: 'published', batch: 'B' },
  { id: 'assuncao', city: 'Assunção', country: 'Paraguai', region: 'América do Sul', tags: ['cidade'], desc: 'Capital paraguaia e o Cone Sul.', slug: 'como-planejar-viagem-assuncao', status: 'published', batch: 'B' },
  { id: 'bogota', city: 'Bogotá', country: 'Colômbia', region: 'América do Sul', tags: ['cidade', 'cultura'], desc: 'Altitude, museus e a capital colombiana.', slug: 'como-planejar-viagem-bogota', status: 'published', batch: 'B' },
  { id: 'medellin', city: 'Medellín', country: 'Colômbia', region: 'América do Sul', tags: ['cidade', 'cultura'], desc: 'Cidade da eterna primavera e transformação urbana.', slug: 'como-planejar-viagem-medellin', status: 'published', batch: 'B' },
  { id: 'cidade-do-panama', city: 'Cidade do Panamá', country: 'Panamá', region: 'América do Norte', tags: ['cidade', 'urbano'], desc: 'Canal, Casco Viejo e hub da América Central.', slug: 'como-planejar-viagem-cidade-do-panama', status: 'published', batch: 'B' },
  { id: 'havana', city: 'Havana', country: 'Cuba', region: 'América do Norte', tags: ['cidade', 'caribe', 'cultura', 'historia'], desc: 'Carros clássicos, Habana Vieja e salsa.', slug: 'como-planejar-viagem-havana', status: 'published', batch: 'B' },
  { id: 'cidade-do-mexico', city: 'Cidade do México', country: 'México', region: 'América do Norte', tags: ['cidade', 'cultura', 'gastronomia', 'historia'], desc: 'Teotihuacán, museus e a megalópole mexicana.', slug: 'como-planejar-viagem-cidade-do-mexico', status: 'published', batch: 'B' },
  { id: 'porto-rico', city: 'Porto Rico', country: 'Estados Unidos', region: 'América do Norte', tags: ['praia', 'caribe'], desc: 'San Juan, bioluminescência e o Caribe americano.', slug: 'como-planejar-viagem-porto-rico', status: 'published', batch: 'B' },
  { id: 'havai', city: 'Havaí', country: 'Estados Unidos', region: 'América do Norte', tags: ['praia', 'natureza', 'oceania'], desc: 'Ilhas vulcânicas e o Pacífico americano.', slug: 'como-planejar-viagem-havai', status: 'published', batch: 'B' },
  { id: 'bahamas', city: 'Bahamas', country: 'Bahamas', region: 'América do Norte', tags: ['praia', 'caribe'], desc: 'Águas turquesa e ilhas caribenhas.', slug: 'como-planejar-viagem-bahamas', status: 'published', batch: 'B' },
  { id: 'chicago', city: 'Chicago', country: 'Estados Unidos', region: 'América do Norte', tags: ['cidade', 'urbano', 'cultura'], desc: 'Arquitetura, lago Michigan e deep dish.', slug: 'como-planejar-viagem-chicago', status: 'published', batch: 'B' },
  { id: 'las-vegas', city: 'Las Vegas', country: 'Estados Unidos', region: 'América do Norte', tags: ['cidade', 'nightlife', 'deserto'], desc: 'Strip, shows e o deserto de Nevada.', slug: 'como-planejar-viagem-las-vegas', status: 'published', batch: 'B' },
  { id: 'abu-dhabi', city: 'Abu Dhabi', country: 'Emirados Árabes Unidos', region: 'Oriente Médio', tags: ['cidade', 'oriente-medio', 'cultura'], desc: 'Sheikh Zayed, Louvre Abu Dhabi e a capital dos EAU.', status: 'planned', batch: 'B' },
  { id: 'dusseldorf', city: 'Düsseldorf', country: 'Alemanha', region: 'Europa', tags: ['cidade', 'europa'], desc: 'Reno, design e o oeste alemão.', slug: 'como-planejar-viagem-dusseldorf', status: 'published', batch: 'B' },
  { id: 'boston', city: 'Boston', country: 'Estados Unidos', region: 'América do Norte', tags: ['cidade', 'historia', 'cultura'], desc: 'História americana e a Nova Inglaterra.', slug: 'como-planejar-viagem-boston', status: 'published', batch: 'B' },
  { id: 'edimburgo', city: 'Edimburgo', country: 'Reino Unido', region: 'Europa', tags: ['cidade', 'europa', 'historia'], desc: 'Castelo, Royal Mile e a Escócia.', slug: 'como-planejar-viagem-edimburgo', status: 'published', batch: 'B' },
  { id: 'glasgow', city: 'Glasgow', country: 'Reino Unido', region: 'Europa', tags: ['cidade', 'europa', 'cultura'], desc: 'Arte, música e o oeste escocês.', slug: 'como-planejar-viagem-glasgow', status: 'published', batch: 'B' },
  { id: 'bucareste', city: 'Bucareste', country: 'Romênia', region: 'Europa', tags: ['cidade', 'europa'], desc: 'Capital romena e porta para a Transilvânia.', slug: 'como-planejar-viagem-bucareste', status: 'published', batch: 'B' },
  { id: 'casablanca', city: 'Casablanca', country: 'Marrocos', region: 'África', tags: ['cidade', 'africa'], desc: 'Hassan II e a costa atlântica marroquina.', status: 'planned', batch: 'B' },
  { id: 'sofia', city: 'Sófia', country: 'Bulgária', region: 'Europa', tags: ['cidade', 'europa'], desc: 'Capital búlgara e os Bálcãs.', slug: 'como-planejar-viagem-sofia', status: 'published', batch: 'B' },
  { id: 'hangzhou', city: 'Hangzhou', country: 'China', region: 'Ásia', tags: ['cidade', 'asia', 'natureza'], desc: 'Lago Oeste e o charme do leste chinês.', status: 'planned', batch: 'B' },
  { id: 'quito', city: 'Quito', country: 'Equador', region: 'América do Sul', tags: ['cidade', 'historia', 'natureza'], desc: 'Centro histórico na linha do Equador.', slug: 'como-planejar-viagem-quito', status: 'published', batch: 'B' },
  { id: 'lagos', city: 'Lagos', country: 'Nigéria', region: 'África', tags: ['cidade', 'africa', 'urbano'], desc: 'Megalópole nigeriana e a costa oeste africana.', status: 'planned', batch: 'B' },

  // —— CMS extras (já na home, sem guia completo) ——
  { id: 'santorini', city: 'Santorini', country: 'Grécia', region: 'Europa', tags: ['praia', 'europa', 'romantico'], desc: 'Caldeira, pôr do sol e as Ciclades.', slug: 'como-planejar-viagem-santorini', status: 'published', batch: 'cms' },
  { id: 'capadocia', city: 'Capadócia', country: 'Turquia', region: 'Oriente Médio', tags: ['natureza', 'oriente-medio'], desc: 'Balões, chimneys e o interior turco.', status: 'planned', batch: 'cms' },
  { id: 'fernando-de-noronha', city: 'Fernando de Noronha', country: 'Brasil', region: 'América do Sul', tags: ['praia', 'brasil', 'natureza'], desc: 'Arquipélago protegido e o Atlântico brasileiro.', slug: 'como-planejar-viagem-fernando-de-noronha', status: 'published', batch: 'cms' }
];

export const REGION_OPTIONS = [
  { id: 'Europa', label: 'Europa' },
  { id: 'América do Norte', label: 'América do Norte' },
  { id: 'América do Sul', label: 'América do Sul' },
  { id: 'Ásia', label: 'Ásia' },
  { id: 'Oriente Médio', label: 'Oriente Médio' },
  { id: 'África', label: 'África' },
  { id: 'Oceania', label: 'Oceania' }
];

export const TAG_OPTIONS = [
  { id: 'praia', label: 'Praia' },
  { id: 'cidade', label: 'Cidade' },
  { id: 'europa', label: 'Europa' },
  { id: 'brasil', label: 'Brasil' },
  { id: 'asia', label: 'Ásia' },
  { id: 'caribe', label: 'Caribe' },
  { id: 'natureza', label: 'Natureza' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'montanha', label: 'Montanha' },
  { id: 'familia', label: 'Família' },
  { id: 'romantico', label: 'Romântico' },
  { id: 'urbano', label: 'Urbano' },
  { id: 'historia', label: 'História' },
  { id: 'nightlife', label: 'Vida noturna' },
  { id: 'luxo', label: 'Luxo' }
];

export function publishedDestinations() {
  return DESTINATIONS_CATALOG.filter((d) => d.status === 'published');
}

export function catalogStats() {
  const byStatus = DESTINATIONS_CATALOG.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});
  return {
    total: DESTINATIONS_CATALOG.length,
    published: byStatus.published || 0,
    planned: byStatus.planned || 0
  };
}
