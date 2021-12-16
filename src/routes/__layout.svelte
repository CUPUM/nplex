<script>
	import '../app.postcss';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import MainSearch from '$components/MainSearch.svelte';
</script>


<Header />
<MainSearch />
<main>
	<slot/>
</main>


<style lang="postcss">
	main {
		background-color: color(base700);
		flex: 1;
	}
</style>