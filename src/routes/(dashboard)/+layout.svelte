<script lang="ts">
	import Dashboard from '$lib/components/patterns/dashboard.svelte';

	let { children } = $props();
</script>

<Dashboard>
	{@render children()}
</Dashboard>
<!-- <aside>
	<section>
		<h2>
			{m.my_projects()}
		</h2>
	</section>
	<section>
		<h2>
			{m.my_organizations()}
		</h2>
	</section>
</aside> -->
