<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import { dirtyValues } from '../../../common';
	import { project } from '../common';

	export let data;
</script>

<Dirty
	sample={data.project.indicators}
	specimen={$project.indicators}
	bind:dirty={$dirtyValues.indicators}
/>
{#each data.descriptors.exemplarityCategories as category}
	<fieldset class="editor-form-group">
		<h3 class="editor-form-group-title">{category.title}</h3>
		<!-- <AnimateHeight> -->
		<ul>
			{#each category.indicators as indicator}
				<Token name="indicator" value={indicator.id} bind:group={$project.indicators}>
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
