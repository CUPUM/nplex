<script lang="ts" context="module">
</script>

<script lang="ts">
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { descriptors, project } from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Travaux</h3>
	<Switch style="align-self: flex-start" variant="default" bind:value={$project.type} name="type">
		{#each $descriptors.types as type}
			<SwitchItem value={type.id}>
				{type.title}
			</SwitchItem>
		{/each}
	</Switch>
</fieldset>

<style lang="scss">
</style>
