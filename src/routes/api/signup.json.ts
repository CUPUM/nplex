import { supabase } from '$utils/database';

export async function post() {
	const data = {message: 'SIGNUP FROM FORM'}
	return {
		body: data
	}
}