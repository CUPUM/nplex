<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { guard } from '$utils/guard';

	export const load: Load = async ({ url, session }) => {
		const res = await guard({ url, session });
		return res;
	};
</script>

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
	import { authModal } from '$stores/auth';

	db.auth.onAuthStateChange(async (e, s) => {
		// show loading
		if (e !== 'SIGNED_OUT') {
			console.log('Signin still valid');
			// await set auth cookie
		} else {
			// session.set({});
			console.log('Signing out');
			// await unset auth cookie
		}
		// hide loading
	});
</script>

<Nav />
{#if $route?.searchable}
	<Search />
{/if}
<slot />
{#if $authModal}
	<Auth />
{/if}

<!-- {#if !mounted}
	<Loading type="logo" />
{/if} -->
<style>
</style>
