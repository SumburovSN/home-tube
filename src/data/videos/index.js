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
import { pushkin } from './pushkin.js';
import { abvgdeyka } from './abvgdeyka.js';
import { dunno } from './neznayka.js';
import { alice } from './alice.js';
import { chukovsky } from './chukovsky.js';
import { mickey_mouse } from './mickey-mouse.js';
import { maugli } from './maugli.js';
import { masha_and_bear } from './masha-and-bear.js';
import { prostokvashino } from './prostokvashino.js';
import { movies } from './movies.js';
import { avatar } from './avatar.js';
import { nature } from './nature.js';
import { karaoke } from './karaoke.js';
import { foreign_cartoons } from './foreign_cartoons.js';

import { createVideoCatalog } from '../videoUtils';


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
  pushkin,
  abvgdeyka,
  dunno,
  alice,
  chukovsky,
  mickey_mouse,
  maugli,
  masha_and_bear,
  prostokvashino,
  movies,
  avatar,
  nature,
  karaoke,
  foreign_cartoons,
);