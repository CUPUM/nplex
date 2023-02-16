import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const NAME_MIN = 1;
export const NAME_MAX = 150;

export const orgNameSchema = zfd.text(z.string().min(NAME_MIN).max(NAME_MAX));
