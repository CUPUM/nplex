<script lang="ts" context="module">
	import { guard } from '$utils/guard';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, url, fetch }) => {
		const res = await guard({ criteria: ['admin', 'editor', 'visitor'], session, fetch, url });
		return res;
	};
</script>

<script lang="ts">
</script>

<slot />
