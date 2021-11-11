<script>
	import '$styles/app.postcss';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
</script>


<Header></Header>
<main>
	<slot/>
</main>
<Footer></Footer>


<style lang="postcss">
	main {
		flex: 1;
	}
</style>