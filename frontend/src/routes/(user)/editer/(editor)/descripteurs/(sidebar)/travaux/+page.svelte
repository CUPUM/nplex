<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import Work from './Work.svelte';

	export let data: PageData;

	const create = {
		id: -1,
	} as const satisfies Partial<PageData['descriptors']['works'][number]>;

	$: works = [...data.descriptors.works, create];
</script>

<h2>Types de travaux</h2>
<p>
	Vous pouvez ici gérer les types de travaux disponibles pour décrire un projet. Dans certaines
	situations, des travaux peuvent caractériser un ou plusieurs type de projet.
</p>
<ul>
	{#each works as work (work.id)}
		<li
			animate:flip={{
				duration: 250,
			}}
			transition:scale|local={{ duration: 150, opacity: 0, easing: cubicInOut }}
		>
			{#if 'title' in work}
				<Work
					id={work.id}
					title={work.title}
					description={work.description}
					types_ids={work.types_ids}
					types={data.descriptors.types}
				/>
			{:else}
				<button>Créer un un nouveau type de travail</button>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	p {
		color: col(fg, 000);
		opacity: 0.75;
		max-width: var(--ui-width-sm);
	}

	form {
		width: 100%;
		border-radius: var(--ui-radius-lg);
	}

	ul {
		display: flex;
		flex-direction: column;
	}

	li {
		transform-origin: bottom center;
	}
</style>
