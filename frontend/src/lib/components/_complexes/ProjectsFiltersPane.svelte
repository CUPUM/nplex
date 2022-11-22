<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { projectsShowFiltersPane } from '$stores/projectsShowFiltersPane';
	import { crossfadeExploreFiltersButton } from '$transitions/crossfades';
	import { width } from '$transitions/width';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import ProjectsFilter from './ProjectsFilter.svelte';

	const [send, receive] = crossfadeExploreFiltersButton;

	function close() {
		projectsShowFiltersPane.set(false);
	}

	function submit(e) {
		// Do stuff
	}

	onMount(() => {});
</script>

<section
	class="filters"
	class:min={!$projectsShowFiltersPane}
	transition:width|local={{ duration: 350, easing: expoOut }}
>
	{#if $projectsShowFiltersPane}
		<div class="inner">
			<header>
				<div class="filters-close" in:receive={{ key: '' }} out:send|local={{ key: '' }}>
					<Button on:click={close} square>
						<Icon name="cross" />
					</Button>
				</div>
				<span>Filtres de projets</span>
			</header>
			<form transition:fade|local={{}} on:submit|preventDefault on:input={submit}>
				<ProjectsFilter legend="Fourchettes de coût">
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
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
				<p>23rfazdf</p>
			</form>
		</div>
	{/if}
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
		overflow: hidden;
		background: white;
		border-radius: 1.5rem;
		transition: all 0.2s cubic-bezier(0.7, 0, 0, 1);

		&::after {
			z-index: 10;
			content: '';
			position: absolute;
			width: 100%;
			left: 0;
			height: 100%;
			pointer-events: none;
			opacity: 0;
			background: var(--color-light-900);
			transition: all 0.2s cubic-bezier(0, 0, 0.5, 1);
		}

		&.min {
			width: 8px;
			border-radius: 8px;
			cursor: e-resize;

			&::after {
				opacity: 1;
			}

			&:hover {
				&::after {
					background: white;
				}
			}
		}
	}

	.inner {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden scroll;
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		width: var(--search-width);
		overflow: hidden;
		padding: 0;
		margin: 0;
		min-height: 100%;
	}

	header {
		position: sticky;
		top: 0;
		padding: 1rem;
		padding-bottom: 0.5rem;
		display: flex;
		align-self: stretch;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		z-index: 2;
		gap: 1rem;
		backdrop-filter: blur(8px);
		background: rgba(255, 255, 255, 0.8);

		& span {
			font-weight: 500;
			letter-spacing: 0.2px;
		}
	}

	.filters-close {
		font-size: var(--ui-size-xsmall);
		padding: 0;
		margin: 0;
		top: 1rem;
		left: 1rem;
	}
</style>
