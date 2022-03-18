<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Nav from '$components/complexes/Nav.svelte';
	import Search from '$components/complexes/Search.svelte';
	import { route, topRoute } from '$stores/route';
	import { rootRoute } from '$utils/routes';
	import { onMount } from 'svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import Auth from '$components/complexes/Auth.svelte';
	import { db } from '$utils/database';
	import { session } from '$app/stores';
	import { browser } from '$app/env';

	if (browser) {
		$session = db.auth.session();
		db.auth.onAuthStateChange((e, s) => {
			$session = s;
		});
	}
</script>

<Nav />
{#if $route?.searchable}
	<Search />
{/if}
<slot />
<Auth />

<!-- {#if !mounted}
	<Loading type="logo" />
{/if} -->
<style>
</style>
