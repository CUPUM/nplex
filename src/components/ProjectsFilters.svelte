<script lang="ts">
	import { showProjectsFilters } from '$stores/projectsStore';
	import { projectsFilters } from '$stores/queryStore';
	import { width } from '$transitions/width';
	import { createEventDispatcher } from 'svelte';

	const dispatchResize = createEventDispatcher();
	function resizeend() {
		dispatchResize('resizeend')
	}
</script>




<!-- {#if $showProjectsFilters} -->
	<section
		transition:width|local
		on:introend={resizeend}
		on:outroend={resizeend}
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
<!-- {/if} -->




<style>
	section {
		width: 400px;
		background-color: color(base700);
		border-radius: 1rem;
		margin-right: 1rem;
		overflow: visible auto;
	}
</style>