<script lang="ts">
	import { projectsFilters } from '$stores/projects';
	import type { SearchParams } from '$utils/keys';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let label: string;
	export let id: SearchParams;
	export let defaultValue: any;

	if (!$projectsFilters[id]) {
		$projectsFilters[id] = {
			expanded: true,
			value: defaultValue,
		};
	}
</script>

<fieldset>
	<legend on:click={() => projectsFilters.toggleExpand(id)}>
		<span class="label">{label}</span>
	</legend>
	{#if $projectsFilters[id].expanded}
		<section transition:slide|local={{ duration: 250, easing: expoOut }}>
			<slot {id} />
		</section>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		display: block;
		flex: none;
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		border: none;
		overflow: hidden;
		transition: all 0.1s ease-out;
	}

	legend {
		position: relative;
		user-select: none;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: var(--size-large);
		width: 100%;
		cursor: pointer;
		padding: 1em 1em;
		margin: 0;
		transition: all 0.15s ease-out;
		font-weight: 550;
		color: var(--color-dark-100);

		&:hover {
			color: var(--color-primary-500);
			/* background-color: var(--color-light-100); */

			& .line::after {
				width: 100%;
			}

			& .chevron {
				/* background-color: var(--color-light-100); */
				box-shadow: 0 0 0 1px var(--color-light-700);
			}
		}
	}

	section {
		position: relative;
		padding-inline: 1em;
		padding-block: 1px 2em;
		margin: 0;
		display: block;
		width: 100%;
	}

	.label {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
</style>
