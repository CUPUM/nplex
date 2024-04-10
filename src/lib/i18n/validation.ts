import type { AvailableLanguageTag } from '$i18n/runtime';
import { isAvailableLanguageTag } from '$i18n/runtime';
import { z } from 'zod';

export const langSchema = z.custom<AvailableLanguageTag>(isAvailableLanguageTag);
export type LangSchema = typeof langSchema;
