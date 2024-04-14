import type { Infer, SuperValidated } from 'sveltekit-superforms';
import type { SuperForm } from './super-form';

export type SuperFormData<T extends SuperValidated<Infer<Record<string, unknown>>>> =
	T extends SuperValidated<infer U> ? SuperForm<U> : never;
