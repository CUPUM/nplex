<script lang="ts">
	import type { PageData } from './$types';
	import DescriptorsMenu from './DescriptorsMenu.svelte';

	export let data: PageData;
</script>

<article>
	<div class="bg" aria-hidden />
	<DescriptorsMenu />
	<section>
		<slot />
	</section>
</article>

<style lang="scss">
	hr {
		align-self: stretch;
	}

	article {
		position: relative;
		flex: 1;
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-px));
		display: grid;
		grid-template-columns:
			minmax(0, calc(50% - 0.5 * var(--ui-width-main)))
			max-content
			1fr
			minmax(0, calc(50% - 0.5 * var(--ui-width-main)));
		align-items: flex-start;
	}

	section {
		grid-column: 3 / 4;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 3rem;
	}

	.bg {
		position: absolute;
		top: 0;
		grid-column: 3 / -1;
		background: col(bg, 500);
		height: 100%;
		width: 100%;
		border-top-left-radius: var(--ui-radius-xl);
		border-bottom-left-radius: var(--ui-radius-xl);
	}
</style>
