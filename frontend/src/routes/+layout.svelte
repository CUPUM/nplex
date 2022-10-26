<script lang="ts">
	import { afterNavigate, beforeNavigate, goto, invalidate } from '$app/navigation';
	import { getStores } from '$app/stores';
	import Loading from '$components/Loading.svelte';
	import LoadingProgress from '$components/LoadingProgress.svelte';
	import { authModal } from '$stores/authModal';
	import { mainScroll } from '$stores/scroll';
	import { vars } from '$styles/app.css';
	import '$styles/app.scss';
	import '$styles/vars.css';
	import { dbClient } from '$utils/database/database';
	import { Cookie } from '$utils/keys';
	import jscookie from 'js-cookie';
	import { get_current_component } from 'svelte/internal';
	import { get } from 'svelte/store';
	import type { LayoutData } from './$types';
	import type { AuthUpdateBody } from './api/auth/session.json/+server';
	import AuthModal from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import MessagesOutlet from './MessagesOutlet.svelte';
	import Navbar from './Navbar.svelte';

	export let data: LayoutData;

	console.log(get_current_component().$$);

	let progress: LoadingProgress;
	let loading = true;
	let navbarHeight: number = 0;

	const { page } = getStores();

	// Listening to and handling client-side Supabase auth state change.
	dbClient.forBrowser.auth.onAuthStateChange(async (event, session) => {
		let restoredTab = false;
		if (event === 'SIGNED_IN' && session?.access_token === data.session?.access_token) {
			// With `client.options.multiTab: true`, Supabase retriggers a `SIGNED_IN` event on each tab restoration.
			// We thus have to handle this ourselves to avoid inadequate redirects after invalidation of the auth update api endpoint.
			restoredTab = true;
		}
		// Set temporary client cookies to communicate auth change data to the server.
		const newAuth: AuthUpdateBody = { session, event };
		jscookie.set(Cookie.AuthChange, JSON.stringify(newAuth), { path: '/', sameSite: 'strict' });
		await invalidate('/api/auth/session.json');
		if (get(authModal)) await authModal.close();
		if (event === 'SIGNED_IN' && !restoredTab && get(page).url.pathname === '/' && data.session) {
			goto('/compte');
		}
	});

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		loading = false;
		progress.complete();
	});
</script>

<div
	class:authing={$authModal}
	style:--navbar-height="{navbarHeight || 0}px"
	style:--scroll={$mainScroll.y}
	style:--scrollpx="{$mainScroll.y}px"
>
	<Navbar bind:navbarHeight />
	<main class:loading>
		<slot />
	</main>
	{#if $page.data.showFooter}
		<Footer />
	{/if}
</div>
{#if $authModal}
	<AuthModal />
{/if}
{#if loading}
	<Loading style="position: fixed; top:0; left: 0; width: 100vw; height: 100vh" size={vars.sizes.large} />
{/if}
<MessagesOutlet />
<LoadingProgress bind:this={progress} />

<style lang="scss">
	main {
		position: relative;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		padding: 0;
		padding-bottom: 4rem;
		margin: 0;
	}

	div {
		transform-origin: 50vw calc(var(--scrollpx) + 50vh);
		transition: transform 0.8s cubic-bezier(0.2, 0, 0, 1), border-radius 0.8s ease-out;
	}

	.authing {
		transform: scale(0.96);
		border-radius: 3em;
	}

	.loading {
		opacity: 0;
	}
</style>
