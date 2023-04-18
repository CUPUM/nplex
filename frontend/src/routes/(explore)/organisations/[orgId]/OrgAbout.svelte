<script lang="ts">
	import RenderMarkdown from '$components/RenderMarkdown.svelte';
	import { getOrgContext } from './common';

	const org = getOrgContext();
</script>

<section>
	<h2 class="heading-lg">À propos</h2>
	<RenderMarkdown source={org.about ?? 'Présentation à venir.'} />
</section>

<style lang="scss">
	section {
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		margin: var(--ui-gutter-sm);
		padding: var(--ui-gutter-md);
	}
</style>
