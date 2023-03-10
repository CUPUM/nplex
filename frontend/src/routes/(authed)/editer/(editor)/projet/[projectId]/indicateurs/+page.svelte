<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Token from '$components/Token/Token.svelte';
	import { editorDirtyValues, editorIsDirty } from '../../../common';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';

	export let data;

	let formIndicators: string[];
	function syncDown() {
		formIndicators = data.project.indicators.map((ind) => ind.id);
	}
	syncDown();

	$: syncDown();

	$: console.log($editorIsDirty);
</script>

<Dirty
	sample={data.project.indicators.map((ind) => ind.id)}
	specimen={formIndicators}
	bind:dirty={$editorDirtyValues.indicators}
/>
{#each data.indicators as metaIndicator}
	<EditorFormgroup legend={metaIndicator.title}>
		<!-- <AnimateHeight> -->
		<ul>
			{#each metaIndicator.indicators as indicator}
				<Token value={indicator.id} bind:group={formIndicators}>{indicator.title}</Token>
			{/each}
		</ul>
		<!-- </AnimateHeight> -->
	</EditorFormgroup>
{/each}

<!-- {/each} -->
<style lang="scss">
	ul {
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
	}
</style>
