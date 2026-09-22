import { smeshariki } from './smeshariki';
import { leopold } from './leopold';
import { karusel } from './karusel';
import { bremenskie } from './bremenskie.js';
import { music } from './music';

import { createVideoCatalog } from '../videoUtils';

export const videos = createVideoCatalog(
  smeshariki,
  leopold,
  karusel,
  bremenskie,
  music,
);