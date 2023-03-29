<script lang="ts">
	import AnimateHeight from '$components/AnimateHeight.svelte';
	import Dirty from '$components/Dirty.svelte';
	import DragndropProvider from '$components/Dragndrop/DragndropProvider.svelte';
	import Icon from '$components/Icon.svelte';
	import { dirtyValues } from '$routes/(authed)/editer/common';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { exemplarityCategories } from './common';
	import IndicatorCard from './IndicatorCard.svelte';
	import IndicatorCreate from './IndicatorCreate.svelte';

	export let data;

	function syncDown() {
		exemplarityCategories.set(JSON.parse(JSON.stringify(data.exemplarityCategories)));
	}
	syncDown();
	$: data.exemplarityCategories, syncDown();

	type NewIndicator = Pick<
		PageData['exemplarityCategories'][number]['indicators'][number],
		'id' | 'title' | 'short_title' | 'description'
	>;
</script>

<Dirty
	sample={data.exemplarityCategories}
	specimen={$exemplarityCategories}
	bind:dirty={$dirtyValues.indicators}
/>
<header class="editor-form-header">
	<h2 class="heading-xl">Indicateurs d'exemplarité</h2>
	<p class="text-lg info">
		Les indicateurs d'exemplarité consistent en plusieurs ensembles de jetons utilisés pour décrire
		les projets et souligner les caractéristiques qui témoignent de leur qualité.
	</p>
	<p class="subtle">
		<Icon name="info-circle" />&ensp; Ci-dessous, vous pouvez gérer la banque générale des
		indicateurs qui pourront par la suite être associés aux divers projets documentés sur la
		plateforme. Vous pouvez changer la catégorie d'un indicateur en le glissant d'une boîte à
		l'autre.
	</p>
</header>
{#each $exemplarityCategories as category, i0}
	<fieldset class="editor-form-group">
		<h3 class="editor-form-group-title">{category.title}</h3>
		<AnimateHeight>
			<p class="subtle">{category.description || 'Description à venir...'}</p>
			<DragndropProvider
				fallbackClass="dnd-fallback-indicator-cardx"
				bind:items={category.indicators}
				sort={true}
				let:dragndropZone
				let:dragndropItem
				group={{
					name: 'indicators',
				}}
			>
				<ul use:dragndropZone>
					{#each category.indicators as indicator, i1 (indicator.id)}
						<li
							use:dragndropItem={{ item: indicator }}
							in:fly|local={{ y: -6, duration: 350, delay: 100 * i1 }}
						>
							<IndicatorCard categoryId={category.id} bind:data={indicator} />
						</li>
					{/each}
				</ul>
			</DragndropProvider>
			<IndicatorCreate category={category.id} />
		</AnimateHeight>
	</fieldset>
{/each}

<style lang="scss">
	:global(.dnd-ghost) {
		opacity: 0.5;
		scale: 0.98;
		// transform: scale(0.9);
	}

	:global(.dnd-dragging) {
		opacity: 1 !important;
		background-color: col(bg, 900);
		border-radius: var(--ui-radius-md);
		box-shadow: var(--ui-shadow-md);
		scale: 0.98;
	}

	header {
		padding: 3rem;
	}

	ul {
		position: relative;
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: var(--ui-width-md);
		margin-bottom: 0.5rem;
	}

	li {
		list-style-type: none;
		position: relative;
		transition: opacity 0.15s, scale 0.15s ease-out, background-color 0.15s ease;
	}
</style>
