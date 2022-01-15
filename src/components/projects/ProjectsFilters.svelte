<script lang="ts">
	import { projectsFilters } from '$stores/query';
	import { width } from '$transitions/width';
	import { createEventDispatcher } from 'svelte';

	const dispatchResize = createEventDispatcher();
	function resizeend() {
		dispatchResize('resizeend');
	}
</script>

<section transition:width|local={{ duration: 350 }} on:introend={resizeend} on:outroend={resizeend}>
	<form>
		<label for="search-input">Search</label>
		<input
			name="search"
			placeholder="Search"
			type="search"
			autocomplete="off"
			bind:value={$projectsFilters.text}
		/>
		<label>Default false</label>
		<input name="defaultFalse" type="checkbox" bind:checked={$projectsFilters.check} />
		<label>Default true</label>
		<input name="defaultTrue" type="checkbox" bind:checked={$projectsFilters.other} />
	</form>
</section>

<style>
	/* export const filters = style({
	backgroundColor: colors.light[100],
	width: '400px',
	overflow: 'visible auto'
}) */
</style>
