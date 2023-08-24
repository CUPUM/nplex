<script lang="ts">
	import Navmenu from '$lib/components/Navmenu.svelte';

	export let data;
</script>

<Navmenu />
<main>
	<p>{data.locale}</p>
	<slot />
</main>
<footer>Footer</footer>

<style lang="scss">
</style>
