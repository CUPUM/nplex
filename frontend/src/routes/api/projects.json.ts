import type { EndpointOutput } from '@sveltejs/kit';
import { supabase } from '$utils/database';

export async function get(): Promise<EndpointOutput> {
	const { data, error } = await supabase.from('projects').select('*');
	if (error) {
		throw new Error(error.message);
	}
	return {
		body: data
	};
}
