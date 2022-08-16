
// @migration task: Check imports
import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get({ params }: RequestEvent): RequestHandlerOutput {
	const { orgId } = params;
	return {
		body: {
			orgId,
		},
	};
}
