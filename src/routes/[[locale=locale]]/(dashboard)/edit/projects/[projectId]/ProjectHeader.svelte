<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	$: title = ($page.data as PageData).form?.data?.translations?.[$page.data.locale]?.title;
	$: console.log($page.data.form);
</script>

<!-- <header style:background={composeMeshgradient({ opacity: [0.25, 0.5] })}> -->
<header>
	<hgroup>
		<h1 class="heading xl">{title}</h1>
	</hgroup>
</header>

<style lang="postcss">
	header {
		position: relative;
		padding: 2rem;
		min-height: 200px;
		&::after {
			content: '';
			z-index: -1;
			position: absolute;
			inset: 0;
			background-color: var(--color-neutral-50);
			:global(:--dark) & {
				background-color: var(--color-neutral-950);
			}
		}
	}
</style>
