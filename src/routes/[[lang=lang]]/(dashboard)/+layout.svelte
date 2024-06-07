<script lang="ts">
	import * as m from '$i18n/messages';
	import Dashboard from '$lib/components/patterns/dashboard.svelte';

	let { children } = $props();
</script>

<Dashboard>
	{@render children()}
</Dashboard>
<aside>
	<section>
		<h2>
			{m.my_projects()}
		</h2>
	</section>
	<section>
		<h2>
			{m.my_orgs()}
		</h2>
	</section>
</aside>
