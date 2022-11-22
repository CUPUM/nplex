<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { LayoutData } from './$types';

	export let datum: LayoutData['projects'][number];
</script>

<a class="project" href="/editer/projet/{datum.id}">
	<img src="https://picsum.photos/seed/{datum.id}/200/300" alt="" />
	<!-- {datum.title} -->
</a>

<style lang="scss">
</style>
