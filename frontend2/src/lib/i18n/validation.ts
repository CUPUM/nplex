import { z } from 'zod';
import { locales_arr } from './locales';

export const localeSchema = z.enum(locales_arr);
