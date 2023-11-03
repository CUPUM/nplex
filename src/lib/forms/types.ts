import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
import type { AnyZodObject } from 'zod';
import type { SuperForm } from './super-form';

export type SuperFormPageData<T extends SuperValidated<ZodValidation<AnyZodObject>>> =
	T extends SuperValidated<ZodValidation<infer U>> ? SuperForm<U> : never;
