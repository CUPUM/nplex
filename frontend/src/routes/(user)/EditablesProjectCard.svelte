<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { LayoutData } from './$types';

	export let datum: LayoutData['projects'][number];
</script>

<a class="project" href="/editer/projet/{datum.id}">
	<figure>
		<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
	</figure>
	<section>
		<div class="title">{datum.title}</div>
		<div class="type">{datum.type_id}</div>
	</section>
</a>

<style lang="scss">
	a {
		display: block;
		width: var(--ui-size-sm);
	}

	figure {
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: var(--ui-radius-md);
		overflow: hidden;
	}

	img {
		width: 100%;
	}
</style>
