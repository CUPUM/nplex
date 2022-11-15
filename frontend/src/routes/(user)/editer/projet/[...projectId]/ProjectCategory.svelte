<script lang="ts" context="module">
</script>

<script lang="ts">
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';

	import type { PageData } from './$types';

	export let project: PageData['project'];
	export let descriptors: PageData['descriptors'];

	$: console.log(project.category_id);
</script>

<fieldset>
	<Switch bind:group={project.category_id} name="type_id" required>
		{#each descriptors.categories as c}
			<SwitchItem value={c.id}>
				{c.title}
			</SwitchItem>
		{/each}
	</Switch>
</fieldset>

<style lang="scss">
</style>
