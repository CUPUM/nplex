<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				category: 'actors',
			},
		};
	}
</script>

<script lang="ts">
</script>

<slot />
