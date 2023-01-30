import { STATUS_CODES } from '$utils/enums';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CITY_DISTRICT_SOURCES } from './common';

const MAX_AGE = 10; // 60 * 60 * 24 * 10;

// export const prerender = true;

let cache: any = {};

/**
 * Rendering this endpoint at build time to pre-fetch the data.
 *
 * This should instead ideally be a dynamic cacheable (and invalidatable) endpoint, but in-memory
 * caching is not possible/relevant inside server functions on serverless environments (like Vercel)
 * as serverless function instances can't share data.
 */
export const GET = (async (event) => {
	console.log(`Hitting endpoint at ${event.route.id} with params: ${JSON.stringify(event.params)}`);
	if (!(event.params.city in CITY_DISTRICT_SOURCES)) {
		throw error(
			STATUS_CODES.BadRequest,
			`City with param "${event.params.city}" has no documented source URL to fetch.`
		);
	}
	const city = event.params.city as keyof typeof CITY_DISTRICT_SOURCES;
	if (cache[city]) {
		console.log('Found in endpoint in-memory cache');
		return json(cache[event.params.city]);
	}
	const res = await event.fetch(CITY_DISTRICT_SOURCES[city], { method: 'GET' });
	if (!res.ok) {
		console.error(res);
		throw error(STATUS_CODES.InternalServerError, 'Error while fetching from data source.');
	}
	console.log(res);
	const data = await res.json();
	console.log(data);
	cache[city] = data;
	event.setHeaders({ 'cache-control': `max-age=${MAX_AGE}, public` });
	return json(data);
}) satisfies RequestHandler;
