<script lang="ts" context="module">
</script>

<script lang="ts">
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';

	import type { PageData } from './$types';

	export let project: PageData['project'];
	export let descriptors: PageData['descriptors'];
</script>

<fieldset>
	<h3 class="e-h3">Catégorie</h3>
	<Switch bind:group={project.category_id} name="category_id" required>
		{#each descriptors.types as c}
			<SwitchItem value={c.id}>
				{c.title}
			</SwitchItem>
		{/each}
	</Switch>
</fieldset>

<style lang="scss">
	fieldset {
		width: 100%;
		max-width: var(--ui-display-medium);
		margin: 0 auto;
	}
</style>
