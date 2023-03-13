<script lang="ts">
	import { enhance } from '$app/forms';
	import AnimateHeight from '$components/AnimateHeight.svelte';
	import Button from '$components/Button/Button.svelte';
	import Dirty from '$components/Dirty.svelte';
	import DragndropProvider from '$components/Dragndrop/DragndropProvider.svelte';
	import Icon from '$components/Icon.svelte';
	import { fly } from 'svelte/transition';
	import { editorDirtyValues, EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../../common';
	import type { PageData } from './$types';
	import IndicatorCard from './IndicatorCard.svelte';

	export let data;

	let formMetaIndicators: PageData['metaIndicators'];
	function syncDown() {
		formMetaIndicators = JSON.parse(
			JSON.stringify(data.metaIndicators)
		) as PageData['metaIndicators'];
	}
	syncDown();

	$: data.metaIndicators, syncDown();
</script>

<Dirty
	sample={data.metaIndicators}
	specimen={formMetaIndicators}
	bind:dirty={$editorDirtyValues.indicators}
/>
<header>
	<h2 class="heading-xl">Indicateurs d'exemplarité</h2>
	<p class="text-lg info">
		Les indicateurs d'exemplarité consistent en plusieurs ensembles de jetons utilisés pour décrire
		les projets et souligner les caractéristiques qui témoignent de leur qualité.
	</p>
	<p class="info">
		<Icon name="info-circle" />&ensp; Ci-dessous, vous pouvez gérer la banque générale des
		indicateurs qui pourront par la suite être associés aux divers projets documentés sur la
		plateforme. Vous pouvez changer la catégorie d'un indicateur en le glissant d'une boîte à
		l'autre.
	</p>
</header>
<form
	id={EDITOR_FORM_ID}
	action={EDITOR_FORM_ACTION}
	method="POST"
	use:enhance={(a) => {
		return (f) => {
			f.update({ reset: false });
		};
	}}
>
	{#each formMetaIndicators as metaIndicator, i0}
		<section>
			<AnimateHeight>
				<h3 class="heading-md">{metaIndicator.title}</h3>
				<p class="info">{metaIndicator.description || 'Description à venir...'}</p>
				<DragndropProvider
					bind:items={metaIndicator.indicators}
					sort={false}
					let:dragndropZone
					let:dragndropItem
					group={{
						name: 'indicators',
					}}
				>
					<ul use:dragndropZone>
						{#each metaIndicator.indicators as indicator, i1 (indicator.id)}
							<li
								use:dragndropItem={{ item: indicator }}
								in:fly|local={{ y: -6, duration: 350, delay: 100 * i1 }}
							>
								<IndicatorCard categoryId={metaIndicator.id} bind:data={indicator} i={i1} />
							</li>
						{/each}
					</ul>
				</DragndropProvider>
				<Button variant="ghost" style="font-size: var(--ui-text-sm);">
					<Icon name="plus" slot="leading" /> Créer un nouvel indicateur
				</Button>
			</AnimateHeight>
		</section>
	{/each}
</form>

<style lang="scss">
	form {
		// display: grid;
		// grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	header {
		padding: 3rem;
	}

	section {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 3rem;
		background-color: col(bg, 500);
		border-radius: var(--ui-radius-lg);
	}

	ul {
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: var(--ui-width-md);
		margin-bottom: 0.5rem;
	}

	li {
		position: relative;
	}
</style>
