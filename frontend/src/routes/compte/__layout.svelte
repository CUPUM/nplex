<script lang="ts" context="module">
	import { guard } from '$utils/auth';
	import { allRoles } from '$utils/user';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		const res = await guard({ criteria: allRoles, session });
		return res;
	};
</script>

<script lang="ts">
</script>

<slot />
