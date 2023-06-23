#!/usr/bin/env node
import Pastel from 'pastel';

const app = new Pastel({
  importMeta: import.meta,
  name: 'c',
  version: '0.2.1',
});

await app.run();
