import { smeshariki } from './smeshariki';
import { leopold } from './leopold';
import { karusel } from './karusel';
import { bremenskie } from './bremenskie.js';
import { music_kids } from './music-kids.js';
import { kids_movie_fairy_tales } from './kids-movie-fairy-tales.js';
import { kids_movie_adventures } from './kids-movie-adventure.js';
import { parrots } from './38parrots.js';
import { cartoons } from './cartoons.js';
import { katerok } from './katerok.js';
import { cheburashka } from './cheburashka.js';
import { funtik } from './funtik.js';
import { umka } from './umka.js';
import { winnie_the_pooh } from './winnie-the-pooh.js';

import { createVideoCatalog } from '../videoUtils';
import { cartoons } from './cartoons.js';

export const videos = createVideoCatalog(
  kids_movie_fairy_tales,
  kids_movie_adventures,
  cartoons,
  katerok,
  parrots,
  smeshariki,
  leopold,
  karusel,
  bremenskie,
  cheburashka,
  funtik,
  umka,
  winnie_the_pooh,
  music_kids,
);