<script lang="ts" context="module">
	import { guard } from '$utils/routing/guards';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session, url, fetch }) => {
		const res = await guard.role({ roles: ['admin', 'editor', 'visitor'], session, url });
		return res;
	};
</script>

<script lang="ts">
</script>

<slot />
