import { Flame, Heart, MapPin, Star } from 'lucide-react';
import { destinationGuides } from '@/data/guidesData';
import {
  DESTINATIONS_CATALOG,
  VISIBLE_DESTINATION_IDS
} from '@/data/destinationsCatalog';

/** Editorial featured destinations for /guias hub (max 10). Order is intentional. */
export const FEATURED_DESTINATION_IDS = VISIBLE_DESTINATION_IDS;

export const BADGE_BY_ID = {
  paris: { label: 'Mais acessado', tone: 'orange', icon: Flame },
  roma: { label: 'Clássico', tone: 'amber', icon: Star },
  'nova-york': { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
  londres: { label: 'Clássico', tone: 'amber', icon: Star },
  toquio: { label: 'Mais acessado', tone: 'orange', icon: Flame },
  istambul: { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
  dubai: { label: 'Clássico', tone: 'amber', icon: Star },
  'rio-de-janeiro': { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
  lisboa: { label: 'Clássico', tone: 'amber', icon: Star },
  barcelona: { label: 'Mais acessado', tone: 'orange', icon: Flame }
};

export const BADGE_TONES = {
  orange: 'bg-brand-orange text-white',
  amber: 'bg-amber-500 text-white',
  rose: 'bg-[#E11D48] text-white',
  slate: 'bg-slate-700/90 text-white'
};

export function normalizeSearch(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function enrichDestination(entry) {
  const guide = entry.slug ? destinationGuides[entry.slug] : null;
  const published = entry.status === 'published' && Boolean(guide);
  return {
    ...entry,
    guide,
    published,
    url: published ? `/guias/${entry.slug}` : null,
    badge: BADGE_BY_ID[entry.id] || (published
      ? { label: 'Guia completo', tone: 'amber', icon: Star }
      : { label: 'Em breve', tone: 'slate', icon: MapPin })
  };
}

/** Full catalog enriched (includes hidden). Prefer GUIAS_DESTINATIONS for public UI. */
export const GUIAS_DESTINATIONS_ALL = DESTINATIONS_CATALOG.map(enrichDestination);

/** Public Guia listings — visible destinations in home order 1–10. */
export const GUIAS_DESTINATIONS = FEATURED_DESTINATION_IDS
  .map((id) => GUIAS_DESTINATIONS_ALL.find((destination) => destination.id === id))
  .filter(Boolean);

export function getFeaturedDestinations(destinations = GUIAS_DESTINATIONS) {
  const byId = new Map(destinations.map((d) => [d.id, d]));
  return FEATURED_DESTINATION_IDS.map((id) => byId.get(id))
    .filter((d) => d?.published);
}
