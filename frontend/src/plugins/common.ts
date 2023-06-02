import { readFileSync } from 'fs';
import { resolve } from 'path';

const prettierFile = resolve('..', '.prettierrc.json');

export const prettierConfig = JSON.parse(readFileSync(prettierFile).toString());
