<script lang="ts">
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { descriptors, project } from '../common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Mode d'implantation</h3>
	<p class="subtle">
		S'il y a lieu, indiquez comment le bâtiment s'imbrique parmi les bâtiments voisins.
	</p>
	<Switch variant="default" bind:value={$project.implantation_mode} name="implantation_mode">
		{#each $descriptors.implantationModes as mode}
			<SwitchItem value={mode.id}>
				{mode.title}
			</SwitchItem>
		{/each}
	</Switch>
</fieldset>

<style lang="scss">
</style>
