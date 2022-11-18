<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { LayoutData } from './$types';
	import EditablesList from './EditablesList.svelte';
	export let data: LayoutData;
</script>

<slot />
<!-- <hr class="dashed" /> -->
<article id="entries">
	<h2>Fiches éditables</h2>
	<EditablesList title="Mes fiches de projet" data={data.projects} let:datum>
		<a class="project" href="/editer/projet/{datum.id}">
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
			<!-- {datum.title} -->
		</a>
		<a class="project" href="/editer/projet" slot="placeholder"> New :D </a>
	</EditablesList>
</article>

<style lang="scss">
	article {
		width: 100%;
		padding: 0;
		// background: col(bg, 500);
	}

	h2 {
		position: relative;
		font-weight: 500;
		font-size: 3rem;
		max-width: 1200px;
		padding: 2rem;
		margin: 0 auto;
	}

	.project {
		padding: 0;
		margin: 0;
		display: block;
		position: relative;
		height: 350px;
		aspect-ratio: 3 / 4;
		background: col(bg, 000);
		border-radius: 1.5rem;
		transition: all 0.25s ease-in-out;
		&:hover {
			// background: col(bg, 100);
			box-shadow: 0 2em 3em -1.5em rgba(0, 10, 20, 0.25);
		}
	}
</style>
