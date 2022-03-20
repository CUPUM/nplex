<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { guard } from '$utils/guard';
	import { session } from '$app/stores';

	export const load: Load = async ({ url, session }) => {
		const pass = guard({ url, session });
		if (!pass) {
			authModal.set(true);
			return {
				status: 303,
				redirect: session.prevnav || '/',
				props: {
					authModalProp: 1,
				},
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
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export let prevnav: string;
	export let authModalProp = 0;

	$: console.log(authModalProp);

	$: if (browser && $session.prevnav !== prevnav) {
		session.update((s) => ({ ...s, prevnav }));
	}

	let mounted = false;
	let loading = false;

	db.auth.onAuthStateChange(async (e, s) => {
		// loading = true;
		// const _s = e === 'SIGNED_OUT' ? null : s;
		// await updateServerSession(e, _s);
		session.update((v) => ({ ...v, user: e === 'SIGNED_OUT' ? null : s.user }));
		if (e === 'SIGNED_OUT') {
			goto('/');
		}
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
<slot />
{#if $authModal}
	<Auth />
{/if}
{#if !mounted || loading}
	<Loading type="logo" />
{/if}

<style>
</style>
