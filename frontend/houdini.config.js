/**
 * @type {import('houdini').ConfigFile}
 */
const config = {
	apiUrl(env) {
		return 'http://localhost:54321/graphql/v1';
		// const url = env.VITE_SUPABASE_GRAPHQL_URL;
		// if (!url) {
		// 	throw new Error('Missing api url expected under PUBLIC_SUPABASE_GRAPHQL_URL env var.');
		// }
		// return url;
	},
	schemaPollHeaders(env) {
		const apiKey =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';
		return {
			apiKey,
		};
	},
	schemaPath: './src/lib/graphql/schema.graphql',
	logLevel: 'full',
	scalars: {
		DateTime: {
			type: 'Date',
			marshal(val) {
				return val.getTime();
			},
			unmarshal(val) {
				return new Date(val);
			},
		},
	},
	plugins: {
		'houdini-svelte': {
			client: './src/lib/utils/database/houdiniClient.ts',
		},
	},
};

export default config;
