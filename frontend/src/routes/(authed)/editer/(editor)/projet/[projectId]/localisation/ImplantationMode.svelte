<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from '../$types';

	$: ({ implantationModes } = ($page.data as PageData).descriptors);
	$: ({ implantation_mode_id } = ($page.data as PageData).project);
	$: form_implantationModeId = implantation_mode_id;
</script>

<section class="editor-section">
	<h3 class="legend">Mode d'implantation</h3>
	<p class="subtle">
		S'il y a lieu, indiquez comment le bâtiment s'imbrique parmi les bâtiments voisins.
	</p>
	<!-- <Switch bind:group={form_implantationModeId} name="implantation_mode_id">
		{#each implantationModes as mode}
			<SwitchItem value={mode.id}>
				{mode.title}
			</SwitchItem>
		{/each}
	</Switch> -->
</section>

<style lang="scss">
</style>
