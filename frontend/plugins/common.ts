import { readFileSync } from 'fs';
import { resolve } from 'path';

export const PRETTIER_CONFIG = JSON.parse(readFileSync(resolve('.prettierrc')).toString());
