<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { LayoutData } from './$types';
	import EditableEntries from './EditableEntries.svelte';
	export let data: LayoutData;
</script>

<slot />
<article id="entries">
	<h2>Fiches éditables</h2>
	<EditableEntries title="Mes fiches de projet" data={data.projects} let:datum>
		<a class="project" href="/editer/projet/{datum.id}">
			<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
			{datum.title}
		</a>
		<a class="project" href="/editer/projet" slot="placeholder"> New :D </a>
	</EditableEntries>
</article>

<style lang="scss">
	article {
		width: 100%;
		padding: 0;
		border-top: 1px solid rgb(var(--rgb-contrast-100), 0.1);
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
		height: 400px;
		aspect-ratio: 3 / 4;
		background: white;
		border-radius: 2rem;
		box-shadow: 0 1em 2em -1em rgba(0, 0, 0, 0.1);
	}
</style>
