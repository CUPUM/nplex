import { z } from 'zod';
import { LOCALES, PLURAL_THRESHOLDS } from './constants';

/**
 * Validate if a given lang code is expected by our site's design.
 */
export const localeSchema = z.nativeEnum(LOCALES);

/**
 * Validate pluralization counts when passed as keys.
 */
export const pluralizeThresholdSchema = z.nativeEnum(PLURAL_THRESHOLDS);
