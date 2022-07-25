<script lang="ts" context="module">
	import { guard } from '$utils/auth';
	import { allRoles } from '$utils/user';
	import type { Load, LoadOutput } from '@sveltejs/kit';

	export const load: Load = async ({ session, url, fetch }): Promise<LoadOutput> => {
		const res = await guard({ criteria: allRoles, session, fetch, url });
		// Make sure the client is at least an authed user (hence checking against 'allRoles'). How to combine with authguard?
		return res;
	};
</script>

<script lang="ts">
</script>

<aside>Form sections here.</aside>
<slot />

<style lang="scss">
	aside {
	}
</style>
