<script lang="ts">
	import { category, showSearchbar } from '$stores/search';
	import { onDestroy } from 'svelte';

	category.set('organisations');
	showSearchbar.set(true);

	onDestroy(() => {
		showSearchbar.set(false);
	});
</script>

<slot />
