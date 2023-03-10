<script lang="ts">
	import { enhance } from '$app/forms';
	import Dirty from '$components/Dirty.svelte';
	import DragndropContext from '$components/Dragndrop/DragndropContext.svelte';
	import { fly } from 'svelte/transition';
	import { editorDirtyValues, EDITOR_FORM_ID } from '../../../common';
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
<form action={EDITOR_FORM_ID} method="POST" use:enhance>
	<header>
		<h2 class="heading-xl">Indicateurs d'exemplarité</h2>
		<p class="info">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro eligendi expedita distinctio
			aliquam possimus asperiores neque sed accusamus voluptatum dolore?
		</p>
	</header>
	{#each formMetaIndicators as metaIndicator, i0}
		<section>
			<h3 class="heading-md">{metaIndicator.title}</h3>
			<p class="info">{metaIndicator.description || 'Description à venir...'}</p>
			<DragndropContext bind:items={metaIndicator.indicators} let:dragndropZone let:dragndropItem>
				<ul use:dragndropZone>
					{#each metaIndicator.indicators as indicator, i1 (indicator.id)}
						<li
							use:dragndropItem={{ item: indicator }}
							in:fly={{ y: -6, duration: 350, delay: 100 * i1 }}
						>
							<IndicatorCard metaId={metaIndicator.id} bind:data={indicator} i={i1} />
						</li>
					{/each}
				</ul>
			</DragndropContext>
		</section>
	{/each}
</form>

<style lang="scss">
	form {
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}
</style>
