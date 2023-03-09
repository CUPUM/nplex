<script lang="ts">
	import { enhance } from '$app/forms';
	import Dirty from '$components/Dirty.svelte';
	import { fly } from 'svelte/transition';
	import { editorDirtyValues, EDITOR_FORM_ID } from '../../../common';
	import type { PageData } from './$types';
	import IndicatorCard from './IndicatorCard.svelte';

	export let data: PageData;

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
		<p class="ui-info">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro eligendi expedita distinctio
			aliquam possimus asperiores neque sed accusamus voluptatum dolore?
		</p>
	</header>
	{#each formMetaIndicators as metaIndicator, i0}
		<section>
			<h3 class="heading-md">{metaIndicator.title}</h3>
			<p class="ui-info">{metaIndicator.description || 'Description à venir...'}</p>
			<ul>
				{#each metaIndicator.indicators as indicator, i1 (indicator.id)}
					<li in:fly={{ y: -6, duration: 350, delay: 100 * i1 }}>
						<IndicatorCard bind:data={indicator} i={i1} />
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	header {
		padding: 3rem;
	}

	section {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-bottom: var(--ui-border-thickness) dashed col(fg, 100, 0.2);
		padding-bottom: 3rem;

		&::after {
			content: '';
			width: 100%;
			height: 12px;
			position: absolute;
			bottom: 0;
			transform: translateY(50%);
			border-inline: var(--ui-border-thickness) dashed col(fg, 100, 0.2);
		}
	}

	h3 {
		padding-left: 3rem;
		border-left: var(--ui-border-thickness) dashed col(fg, 100, 0.2);
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}
</style>
