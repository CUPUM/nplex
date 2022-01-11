<script lang="ts">
	import { showProjectsFilters } from '$stores/projectsStore';
	import { projectsFilters } from '$stores/queryStore';
	import { width } from '$transitions/width';
	import { createEventDispatcher } from 'svelte';
	import { filters } from './ProjectsFilters.css';

	const dispatchResize = createEventDispatcher();
	function resizeend() {
		dispatchResize('resizeend')
	}
</script>



{#if $showProjectsFilters}
	<section
		transition:width|local={{duration: 350}}
		on:introend={resizeend}
		on:outroend={resizeend}
		class={filters}
	>
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
			<input
				name="defaultFalse"
				type="checkbox"
				bind:checked={$projectsFilters.check}
			>
			<label>Default true</label>
			<input
				name="defaultTrue"
				type="checkbox"
				bind:checked={$projectsFilters.other}
			>
		</form>
	</section>
{/if}