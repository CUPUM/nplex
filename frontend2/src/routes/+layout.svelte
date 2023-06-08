<script>
	import NavLangSwitch from '$lib/components/NavLangSwitch.svelte';
	import '../app.scss';

	let lang = 'fr';

	export let data;
</script>

<nav>
	<NavLangSwitch />
</nav>
<p>Current language is: {lang}</p>
<slot />

<style lang="scss">
	nav {
		color: --font-main;
	}
</style>
