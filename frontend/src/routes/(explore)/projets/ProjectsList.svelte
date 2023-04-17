<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import { projectsListOpened } from './common';

	export let projects: PageData['projects'];
</script>

{#if $projectsListOpened}
	<section id="projects-list" transition:slide={{ axis: 'x', easing: expoOut, duration: 250 }}>
		<ul>
			<li>Projet n</li>
		</ul>
	</section>
{/if}

<style lang="scss">
	section {
		z-index: 1;
		position: relative;
		grid-column: list;
		grid-row: 1;
		padding-top: var(--projects-top-overlay-h);
		padding-bottom: var(--ui-gutter-sm);
		align-self: stretch;
	}

	ul {
		width: var(--projects-list-w);
		display: none;
	}

	li {
		padding: 2rem;
		background-color: col(bg, 000);
		// backdrop-filter: blur(8px);
		border-radius: var(--ui-radius-lg);
	}
</style>
