<script lang="ts">
	import type { AuthChangeCookie } from '$api/auth/session.json/+server';
	import { afterNavigate, beforeNavigate, goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '$components/Loading.svelte';
	import LoadingProgress from '$components/LoadingProgress.svelte';
	import { rootScroll } from '$stores/scroll';
	import '$styles/app.scss';
	import '$styles/vars.scss';
	import { dbClient } from '$utils/database/database';
	import { Cookie } from '$utils/enums';
	import jscookie from 'js-cookie';
	import type { LayoutData } from './$types';
	import AuthModal, { authModalState } from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import MessagesOutlet from './MessagesOutlet.svelte';
	import Navbar from './Navbar.svelte';

	export let data: LayoutData;

	let progress: LoadingProgress;
	let loading = true;
	let navbarHeight: number = 0;

	// Listening to and handling client-side Supabase auth state change.
	dbClient.forBrowser.auth.onAuthStateChange(async (event, session) => {
		// Set temporary client cookies to communicate auth change data to the server.
		const newAuth: AuthChangeCookie = { session, event };
		jscookie.set(Cookie.AuthChange, JSON.stringify(newAuth), { path: '/', sameSite: 'strict' });
		invalidate('/api/auth/session.json');
	});

	// Client-side redirect to user's account page if logged into new session.
	$: if (data.session && data.session.user.id !== data.previousSessionId && $authModalState) {
		authModalState.close().then(() => {
			goto('/compte');
		});
	}

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		loading = false;
		progress.complete();
	});
</script>

<div
	class:authing={$authModalState}
	style:--scroll={$rootScroll.y}
	style:--scroll-px="{$rootScroll.y}px"
	style:--navbar-height-px="{navbarHeight}px"
	style:--n-navbar-height-px="-{navbarHeight}px"
>
	<Navbar bind:navbarHeight />
	<main class:loading>
		<slot />
	</main>
	{#if $page.data.showFooter}
		<Footer />
	{/if}
</div>
<AuthModal />
{#if loading}
	<Loading style="position: fixed; top:0; left: 0; width: 100vw; height: 100vh; color: var(--color-primary-700);" />
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
		transform-origin: 50vw calc(var(--scroll-px) + 50vh);
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
