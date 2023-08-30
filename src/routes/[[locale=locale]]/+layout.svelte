<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import Navmenu from '$lib/components/Navmenu.svelte';
</script>

<LoadingProgress />
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
