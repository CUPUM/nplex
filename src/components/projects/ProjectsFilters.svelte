<script lang="ts">
	import { customScrollbar } from '$actions/customScrollbar';
	import { projectsFilters } from '$stores/search';
	import { width } from '$transitions/width';
	import { createEventDispatcher } from 'svelte';

	const dispatchResize = createEventDispatcher();
	function resizeend() {
		dispatchResize('resizeend');
	}
</script>

<section
	transition:width|local={{ duration: 350 }}
	on:introend={resizeend}
	on:outroend={resizeend}
	use:customScrollbar={{ overflowBehavior: { x: 'hidden' } }}
>
	<form>
		<h1>Filtres</h1>
		<fieldset>
			<legend>Radio buttons</legend>
		</fieldset>
		<fieldset>
			<legend>Checkboxes</legend>
		</fieldset>
		<fieldset>
			<legend>Range</legend>
		</fieldset>
		<fieldset>
			<legend>Dropdown</legend>
		</fieldset>
	</form>
</section>

<style>
	section {
		position: relative;
		background-color: var(--color-light-300);
		transition: all 0.5s ease;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
	}

	section:hover {
		position: relative;
		background-color: var(--color-light-100);
	}

	form {
		position: relative;
		width: 400px;
		padding: 0;
		margin: 0;
	}

	fieldset {
		border: none;
		margin: 0;
		position: relative;
		width: 100%;
		height: 500px;
	}
</style>
