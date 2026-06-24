// Rich Snippets Schema.org JSON-LD Builders for 2GO Travel SEO Foundation

export function getDestinationSchema(destination) {
  if (!destination) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TravelDestination",
    "name": destination.name,
    "description": destination.description,
    "url": `https://2go.com.br/destinos/${destination.slug}`,
    "image": `https://2go.com.br${destination.image}`,
    "containedInPlace": {
      "@type": "Country",
      "name": destination.country
    }
  };
}

export function getAttractionSchema(attraction, destinationName) {
  if (!attraction) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": attraction.title,
    "description": attraction.desc,
    "containedInPlace": {
      "@type": "City",
      "name": destinationName
    }
  };
}

export function getFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q || faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a || faq.answer
      }
    }))
  };
}

export function getBreadcrumbsSchema(items) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://2go.com.br${item.url}`
    }))
  };
}

export function getItinerarySchema(itinerary, destinationName) {
  if (!itinerary) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Trip",
    "name": itinerary.title,
    "description": itinerary.desc,
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": itinerary.days.length,
      "itemListElement": itinerary.days.map((day, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": day.day,
          "headline": day.title,
          "description": day.events.map(evt => `${evt.time} - ${evt.title}`).join(', ')
        }
      }))
    }
  };
}
