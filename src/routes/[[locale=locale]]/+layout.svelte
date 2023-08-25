<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Navmenu from '$lib/components/navmenu.svelte';

	// export let data;
</script>

<Navmenu />
<main>
	<slot />
</main>
<Footer />

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		flex-wrap: nowrap;
		padding: 0;
		margin: 0;
	}
</style>
