<svelte:options immutable={false} />

<script lang="ts">
	import { page } from '$app/stores';
	import NavLangSwitch from '$lib/components/NavLangSwitch.svelte';
	import '../../app.scss';

	$: console.log($page.route.id);
</script>

<NavLangSwitch />
<nav>
	<a href="/about">About</a>
	<a href="/guides">Guides</a>
</nav>
<h1>Layout data: {data.locale}</h1>
<slot />

<style lang="scss">
</style>
