<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import { showProjectsFilters } from '$stores/projects';
	import { crossfadeExploreFiltersButton } from '$transitions/crossfades';
	import { width } from '$transitions/width';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import ProjectsFilter from './ProjectsFilter.svelte';

	const [send, receive] = crossfadeExploreFiltersButton;

	function close() {
		showProjectsFilters.set(false);
	}

	function submit(e) {
		// Do stuff
	}

	onMount(() => {});
</script>

<section
	class="filters"
	on:submit|preventDefault
	on:input={submit}
	transition:width|local={{ duration: 350, easing: expoOut }}
>
	<div id="filters-close" in:receive={{ key: '' }} out:send={{ key: '' }}>
		<Button on:click={close} icon="cross" />
	</div>
	<form>
		<ProjectsFilter legend="Fourchettes de coût" key="cost">
			<p>Ceci est un paragraphe test</p>
			<p>Ceci est un paragraphe test</p>
			<p>Ceci est un paragraphe test</p>
			<!-- <label for="">
				<p>Min:</p>
				<input type="number" name="" id="" bind:value={$projectsFilters[id].value.min} />
			</label>
			<label for="">
				<p>Max:</p>
				<input type="number" name="" id="" bind:value={$projectsFilters[id].value.max} />
			</label> -->
		</ProjectsFilter>
	</form>
</section>

<style lang="scss">
	.filters {
		position: relative;
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 0;
		width: var(--search-width);
		margin-left: 1rem;
		margin-right: 0;
		margin-bottom: 1rem;
		overflow-x: hidden;
		border-radius: 1.5rem;
		transition: all 0.25s ease-out;
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		width: var(--search-width);
		overflow-x: hidden;
		overflow-y: visible;
		padding: 0;
		margin: 0;
		background-color: white;
		min-height: 100%;
	}

	.sub-title {
		font-weight: 600;
		font-size: var(--size-small);
		padding-block: 0;
		padding-inline: 0.25em;
		margin-bottom: 1em;
		color: var(--color-dark-900);
	}

	.tokenset:not(:last-child) {
		margin-bottom: 2em;
	}

	#filters-close {
		font-size: var(--size-small);
		padding: 0;
		margin: 0;
		z-index: 2;
		flex: none;
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
