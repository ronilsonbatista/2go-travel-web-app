import { guide as gramado } from './guides/gramado.js';
import { guide as santiago } from './guides/santiago.js';
import { guide as maceio } from './guides/maceio.js';
import { guide as florianopolis } from './guides/florianopolis.js';
import { guide as bariloche } from './guides/bariloche.js';

export const guidesAmericas = {
  [gramado.slug]: gramado,
  [santiago.slug]: santiago,
  [maceio.slug]: maceio,
  [florianopolis.slug]: florianopolis,
  [bariloche.slug]: bariloche
};
