import { PUBLIC_GEOAPIFY_KEY } from '$env/static/public';
import type { LngLatBoundsLike, LngLatLike } from 'maplibre-gl';

interface GeoapifyClientOptions {
	fetcher?: typeof fetch;
	apiKey?: string;
}

type BiasRect = [lng1: number, lat1: number, lng2: number];

export class GeoapifyClient {
	public static base = 'https://api.geoapify.com/v1';
	public fetch;
	public key;

	constructor({ fetcher = fetch, apiKey = PUBLIC_GEOAPIFY_KEY }: GeoapifyClientOptions = {}) {
		this.fetch = fetcher;
		this.key = apiKey;
	}

	async geocode(
		query: string,
		{
			format = 'geojson',
		}: { format?: 'json' | 'xml' | 'geojson'; bias?: LngLatLike | LngLatBoundsLike } = {}
	) {
		try {
			const res = await this.fetch(
				`${GeoapifyClient.base}/geocode/search?text=${encodeURIComponent(
					query
				)}&format=${format}&apiKey=${this.key}`,
				{ method: 'GET' }
			);
			const json = await res.json();
			return json;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

// fetch(
// 	'https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=6a44c02f4a33463fb32ece022704f2c3',
// 	requestOptions
// )
// 	.then((response) => response.json())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log('error', error));
