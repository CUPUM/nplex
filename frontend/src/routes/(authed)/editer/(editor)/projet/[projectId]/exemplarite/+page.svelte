<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import { editorDirtyValues } from '../../../common';

	export let data;

	let formIndicators: number[];
	function syncDown() {
		formIndicators = data.project.indicators.map((pi) => pi.exemplarity_indicator_id);
	}
	syncDown();

	$: syncDown();
</script>

<Dirty
	sample={data.project.indicators.map((pi) => pi.exemplarity_indicator_id)}
	specimen={formIndicators}
	bind:dirty={$editorDirtyValues.indicators}
/>
{#each data.indicators as metaIndicator}
	<fieldset class="editor-form-group">
		<h3 class="editor-form-group-title">{metaIndicator.title}</h3>
		<!-- <AnimateHeight> -->
		<ul>
			{#each metaIndicator.indicators as indicator}
				<Token name="indicator_id" value={indicator.id} bind:group={formIndicators}>
					{indicator.title}
					<TokenButton slot="trailing"><Icon name="question" /></TokenButton>
				</Token>
			{/each}
		</ul>
		<!-- </AnimateHeight> -->
	</fieldset>
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
