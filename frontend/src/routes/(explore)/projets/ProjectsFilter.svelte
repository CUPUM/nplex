<script lang="ts" context="module">
	let n = 0;
</script>

<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { KEY } from '$utils/enums';
	import { onDestroy } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	import { projectsFiltersExpanded } from './common';

	export let key: string;

	const index = n++;

	if ($projectsFiltersExpanded[key] == null) {
		$projectsFiltersExpanded[key] = true;
	}

	function toggle(e: Event) {
		if (e instanceof KeyboardEvent) {
			if (e.key !== KEY.Space && e.key !== KEY.Enter) return;
		}
		$projectsFiltersExpanded[key] = !$projectsFiltersExpanded[key];
	}

	onDestroy(() => {
		n--;
	});
</script>

<fieldset
	class="projects-filter"
	in:fly={{ y: '1rem', duration: 750, delay: index * 75, easing: expoOut }}
>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<legend class="projects-filter-title" on:click={toggle} tabindex="0" on:keypress={toggle}>
		<Ripple />
		<i class:expanded={$projectsFiltersExpanded[key]}>
			<Icon name="chevron-down" />
		</i>
		<div class="inner">
			<slot name="title" />
		</div>
	</legend>
	{#if $projectsFiltersExpanded[key]}
		<section
			class="projects-filter-content"
			in:fly|local={{ duration: 200, easing: expoOut, y: '-2rem', opacity: 0 }}
			out:slide|local={{ duration: 150, easing: expoOut }}
		>
			<slot />
		</section>
	{/if}
</fieldset>

<style lang="scss">
	.projects-filter {
		--filter-inset: var(--ui-inset-sm);
		--filter-radius: var(--ui-radius-xl);
		--filter-padding: 1.5rem;
		background-color: col(bg, 500);
		border-radius: var(--ui-radius-xl);
		display: flex;
		flex-direction: column;
		gap: 0;
		align-items: stretch;
		cursor: pointer;
		transition: all 0.35s ease-out;

		&:hover {
			box-shadow: var(--ui-shadow-md);
		}
	}

	.projects-filter-title {
		color: col(fg, 100);
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		user-select: none;
		padding: var(--filter-padding);
		margin: var(--filter-inset);
		font-size: var(--ui-text-sm);
		font-weight: 500;
		border-radius: calc(var(--filter-radius) - var(--filter-inset));

		.inner {
			display: inline-block;
			position: relative;
			top: -0.1em;
		}

		i {
			position: relative;
			display: inline-flex;
			padding: 0.25em;
			top: -0.1em;
			margin-right: 0.5em;
			border-radius: 50%;
			transform: rotateZ(-90deg);
			transform-origin: center;
			border: var(--ui-border-size) solid col(fg, 100, 0);
			transition: all 0.25s var(--ui-ease-out);

			&.expanded {
				transform: rotateZ(0deg);
			}
		}
		&:hover {
			i {
				color: col(primary, 500);
				border: var(--ui-border-size) solid col(primary, 500, 0.1);
			}
		}
	}

	.projects-filter-content {
		padding: var(--filter-padding);
		padding-top: 0rem;
	}
</style>
