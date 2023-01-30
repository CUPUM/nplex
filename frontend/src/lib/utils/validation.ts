import { z } from 'zod';

/**
 * Utility to validate a given point's coords in [lng, lat]
 */
export const positionSchema = z.union([
	z.tuple([z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number()]),
	z.tuple([z.number(), z.number(), z.number(), z.number()]),
]);
