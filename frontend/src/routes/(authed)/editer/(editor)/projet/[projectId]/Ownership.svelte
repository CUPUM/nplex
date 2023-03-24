<script lang="ts">
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { descriptors, projectData } from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Propriété du site</h3>
	<section class="fields">
		<Switch
			orientation="column"
			variant="outlined"
			bind:value={$projectData.site_ownership_id}
			name="site_ownership_id"
		>
			{#each $descriptors.siteOwnerships as o}
				<SwitchItem value={o.id}>{o.title}</SwitchItem>
			{/each}
		</Switch>
	</section>
</fieldset>

<style lang="scss">
	.fields {
		// writing-mode: vertical-lr;
	}
</style>
