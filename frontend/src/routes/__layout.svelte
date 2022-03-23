<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { guard } from '$utils/guard';

	export const load: Load = async ({ url, session }) => {
		const pass = guard({ url, session });
		if (!pass) {
			authModal.set(true);
			return {
				status: 303,
				redirect: session.prevnav || '/',
			};
		}
		return {
			status: 200,
			props: {
				prevnav: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Nav from '$components/complexes/Nav.svelte';
	import Search from '$components/complexes/Search.svelte';
	import { route } from '$stores/route';
	import Auth from '$components/complexes/Auth.svelte';
	import { db } from '$utils/database';
	import { authModal } from '$stores/auth';
	import { onMount } from 'svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { getSegments } from '$utils/helpers/url';

	export let prevnav: string;

	$: if (browser && $session.prevnav !== prevnav) {
		session.update((s) => ({ ...s, prevnav }));
	}

	let mounted = false;
	let loading = false;
	let naving = false;

	beforeNavigate(({ from, to }) => {
		if (from && to && getSegments(from)[0] !== getSegments(to)[0]) {
			naving = true;
		}
	});

	afterNavigate(() => {
		naving = false;
	});

	db.auth.onAuthStateChange(async (e, s) => {
		// loading = true;
		session.update((v) => {
			if (e === 'SIGNED_OUT') {
				return { prevnav: '/', user: null };
			} else {
				return { ...v, user: s.user };
			}
		});
		// loading = false;
	});

	onMount(() => {
		mounted = true;
	});
</script>

<Nav />
{#if $route?.searchable}
	<Search />
{/if}
<main>
	<slot />
	{#if naving}
		<Loading type="logo" style="font-size: 40px; background-color: var(--color-light-100)" />
	{/if}
</main>
{#if $authModal}
	<Auth />
{/if}
{#if !mounted || loading}
	<Loading type="logo" style="font-size: 40px; background-color: var(--color-light-100)" />
{/if}

<style>
	main {
	}
</style>
