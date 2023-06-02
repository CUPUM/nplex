import path from 'path';
import fs from 'fs';

const file = path.resolve('..', '.prettierrc.json');
const prettier = JSON.parse(fs.readFileSync(file).toString());

console.log(prettier);
