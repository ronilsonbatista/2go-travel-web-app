/**
 * Geographically calibrated attraction pins for the 30-seconds map tab.
 * Coordinates are computed from actual landmark latitude/longitude
 * and projected onto each destination's calibrated ESRI basemap.
 */
export const GUIDE_ATTRACTION_PINS = {
  "como-planejar-viagem-paris": [
    { "name": "Torre Eiffel", "pin": { "top": "56.9%", "left": "36.8%" } },
    { "name": "Museu do Louvre", "pin": { "top": "55.3%", "left": "51.0%" } },
    { "name": "Arco do Triunfo & Champs-Élysées", "pin": { "top": "45.2%", "left": "37.0%" } },
    { "name": "Basílica de Sacré-Cœur e Montmartre", "pin": { "top": "35.4%", "left": "52.8%" } },
    { "name": "Notre-Dame de Paris", "pin": { "top": "61.0%", "left": "55.1%" } },
    { "name": "Musée d’Orsay", "pin": { "top": "55.8%", "left": "47.4%" } }
  ],
  "como-planejar-viagem-nova-york": [
    { "name": "Empire State Building", "pin": { "top": "57.3%", "left": "49.9%" } },
    { "name": "Central Park", "pin": { "top": "31.1%", "left": "56.6%" } },
    { "name": "Times Square & Broadway", "pin": { "top": "50.0%", "left": "50.0%" } },
    { "name": "Estátua da Liberdade & Battery", "pin": { "top": "82.0%", "left": "39.6%" } },
    { "name": "Brooklyn Bridge & DUMBO", "pin": { "top": "82.0%", "left": "46.2%" } },
    { "name": "High Line & Chelsea", "pin": { "top": "57.6%", "left": "43.6%" } }
  ],
  "como-planejar-viagem-londres": [
    { "name": "Big Ben & Palácio de Westminster", "pin": { "top": "55.1%", "left": "51.1%" } },
    { "name": "London Eye", "pin": { "top": "53.1%", "left": "52.7%" } },
    { "name": "Tower Bridge", "pin": { "top": "51.5%", "left": "67.3%" } },
    { "name": "Palácio de Buckingham", "pin": { "top": "54.6%", "left": "45.4%" } },
    { "name": "British Museum", "pin": { "top": "40.9%", "left": "50.3%" } },
    { "name": "Covent Garden", "pin": { "top": "46.8%", "left": "51.3%" } }
  ],
  "como-planejar-viagem-roma": [
    { "name": "Coliseu & Fórum Romano", "pin": { "top": "59.6%", "left": "48.6%" } },
    { "name": "Vaticano & Capela Sistina", "pin": { "top": "49.9%", "left": "35.8%" } },
    { "name": "Fontana di Trevi", "pin": { "top": "51.5%", "left": "45.7%" } },
    { "name": "Pantheon", "pin": { "top": "53.2%", "left": "43.6%" } },
    { "name": "Piazza Navona", "pin": { "top": "52.7%", "left": "42.3%" } },
    { "name": "Trastevere", "pin": { "top": "60.7%", "left": "41.3%" } }
  ],
  "como-planejar-viagem-toquio": [
    { "name": "Templo Senso-ji (Asakusa)", "pin": { "top": "24.5%", "left": "59.8%" } },
    { "name": "Cruzamento de Shibuya", "pin": { "top": "66.5%", "left": "28.0%" } },
    { "name": "Shinjuku & Golden Gai", "pin": { "top": "40.3%", "left": "29.4%" } },
    { "name": "Santuário Meiji (Harajuku)", "pin": { "top": "53.7%", "left": "27.7%" } },
    { "name": "Tokyo Skytree", "pin": { "top": "28.1%", "left": "64.4%" } },
    { "name": "Tokyo Tower", "pin": { "top": "67.2%", "left": "42.8%" } }
  ],
  "como-planejar-viagem-dubai": [
    { "name": "Burj Khalifa", "pin": { "top": "50.0%", "left": "50.0%" } },
    { "name": "Fontes de Dubai & Dubai Mall", "pin": { "top": "49.0%", "left": "51.7%" } },
    { "name": "Dubai Marina & JBR", "pin": { "top": "82.0%", "left": "18.0%" } },
    { "name": "Burj Al Arab & Jumeirah", "pin": { "top": "82.0%", "left": "20.6%" } },
    { "name": "Safari no deserto", "pin": { "top": "82.0%", "left": "74.9%" } },
    { "name": "Dubai Creek (Old Dubai)", "pin": { "top": "18.0%", "left": "60.1%" } }
  ],
  "como-planejar-viagem-istambul": [
    { "name": "Hagia Sophia", "pin": { "top": "49.7%", "left": "50.6%" } },
    { "name": "Mesquita Azul", "pin": { "top": "52.1%", "left": "49.5%" } },
    { "name": "Grande Bazar", "pin": { "top": "48.1%", "left": "46.6%" } },
    { "name": "Torre de Galata & Karaköy", "pin": { "top": "36.8%", "left": "48.6%" } },
    { "name": "Passeio de balsa no Bósforo", "pin": { "top": "40.3%", "left": "52.2%" } },
    { "name": "Kadıköy (lado asiático)", "pin": { "top": "63.1%", "left": "65.4%" } }
  ],
  "como-planejar-viagem-rio-de-janeiro": [
    { "name": "Cristo Redentor", "pin": { "top": "50.0%", "left": "50.0%" } },
    { "name": "Pão de Açúcar", "pin": { "top": "47.9%", "left": "68.5%" } },
    { "name": "Praia de Ipanema", "pin": { "top": "76.5%", "left": "52.0%" } },
    { "name": "Escadaria Selarón", "pin": { "top": "22.4%", "left": "60.3%" } },
    { "name": "Museu do Amanhã", "pin": { "top": "18.0%", "left": "60.2%" } },
    { "name": "Floresta da Tijuca", "pin": { "top": "52.3%", "left": "28.7%" } }
  ],
  "como-planejar-viagem-lisboa": [
    { "name": "Torre de Belém", "pin": { "top": "73.3%", "left": "24.7%" } },
    { "name": "Mosteiro dos Jerónimos", "pin": { "top": "68.5%", "left": "27.8%" } },
    { "name": "Castelo de São Jorge", "pin": { "top": "56.4%", "left": "51.9%" } },
    { "name": "Alfama e miradouros", "pin": { "top": "57.5%", "left": "52.9%" } },
    { "name": "Time Out Market", "pin": { "top": "61.5%", "left": "47.9%" } },
    { "name": "LX Factory", "pin": { "top": "64.1%", "left": "37.0%" } }
  ],
  "como-planejar-viagem-barcelona": [
    { "name": "Sagrada Família", "pin": { "top": "37.7%", "left": "51.9%" } },
    { "name": "Park Güell", "pin": { "top": "29.4%", "left": "44.8%" } },
    { "name": "Barri Gòtic", "pin": { "top": "53.5%", "left": "52.8%" } },
    { "name": "La Rambla / Boqueria", "pin": { "top": "54.3%", "left": "51.0%" } },
    { "name": "Casa Batlló", "pin": { "top": "46.7%", "left": "48.8%" } },
    { "name": "Praia da Barceloneta", "pin": { "top": "57.1%", "left": "57.4%" } }
  ],
  "como-planejar-viagem-abu-dhabi": [
    { "name": "Sheikh Zayed Grand Mosque", "pin": { "top": "81.2%", "left": "82.0%" } },
    { "name": "Louvre Abu Dhabi", "pin": { "top": "18.0%", "left": "57.0%" } },
    { "name": "Qasr Al Watan", "pin": { "top": "43.9%", "left": "26.2%" } },
    { "name": "Yas Island", "pin": { "top": "28.7%", "left": "82.0%" } },
    { "name": "Corniche", "pin": { "top": "34.0%", "left": "36.1%" } },
    { "name": "Emirates Palace area", "pin": { "top": "44.2%", "left": "30.2%" } }
  ],
  "como-planejar-viagem-amsterdam": [
    { "name": "Rijksmuseum", "pin": { "top": "55.8%", "left": "43.8%" } },
    { "name": "Museu Van Gogh", "pin": { "top": "57.0%", "left": "42.4%" } },
    { "name": "Casa de Anne Frank", "pin": { "top": "44.2%", "left": "43.4%" } },
    { "name": "Bairro Jordaan", "pin": { "top": "45.9%", "left": "41.7%" } },
    { "name": "Vondelpark", "pin": { "top": "57.3%", "left": "38.1%" } },
    { "name": "Mercado de flores / Bloemenmarkt", "pin": { "top": "50.6%", "left": "45.8%" } }
  ],
  "como-planejar-viagem-andorra": [
    { "name": "Andorra la Vella", "pin": { "top": "50.0%", "left": "50.0%" } },
    { "name": "Grandvalira", "pin": { "top": "29.0%", "left": "69.5%" } },
    { "name": "Caldea", "pin": { "top": "46.1%", "left": "55.2%" } },
    { "name": "Casa de la Vall", "pin": { "top": "49.9%", "left": "49.5%" } },
    { "name": "Ordino", "pin": { "top": "18.0%", "left": "53.7%" } },
    { "name": "Naturland", "pin": { "top": "82.0%", "left": "43.8%" } }
  ],
  "como-planejar-viagem-antalya": [
    { "name": "Kaleiçi Old Town", "pin": { "top": "59.0%", "left": "47.6%" } },
    { "name": "Düden Waterfalls", "pin": { "top": "82.0%", "left": "73.3%" } },
    { "name": "Aspendos", "pin": { "top": "18.8%", "left": "82.0%" } },
    { "name": "Karaalioglu Park", "pin": { "top": "62.8%", "left": "47.6%" } },
    { "name": "Konyaaltı Beach", "pin": { "top": "64.4%", "left": "24.2%" } },
    { "name": "Termessos", "pin": { "top": "18.0%", "left": "18.0%" } }
  ]
};
