<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { getStores } from '$app/stores';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/authModal';
	import { mainScroll } from '$stores/scroll';
	import '$styles/app.scss';
	import '$styles/vars.css';
	import { browserDbClient } from '$utils/database/database';
	import { Cookie } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import jscookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { LayoutData } from './$types';
	import AuthModal from './AuthModal.svelte';
	import Footer from './Footer.svelte';
	import MessagesOutlet from './MessagesOutlet.svelte';
	import Navbar from './Navbar.svelte';

	export let data: LayoutData;

	let loading = true;
	let navbarHeight: number = 0;

	const { page } = getStores();

	// Listening to and handling client-side Supabase auth state change.
	browserDbClient.auth.onAuthStateChange(async (event, session) => {
		// Set a temporary auth change cookie to be used by the server.
		const body: App.Locals[Cookie.AuthChange] = { session, event };
		jscookie.set(Cookie.AuthChange, JSON.stringify(body));
		await invalidate('/api/auth/update.json');
		if (get(authModal)) await authModal.close();
		if (event === 'SIGNED_IN' && get(page).url.pathname === '/' && data.session) {
			goto('/compte');
		}
	});

	onMount(() => {
		loading = false;
	});
</script>

<div class:authing={$authModal} style:--ty="{$mainScroll.y}px">
	<Navbar bind:navbarHeight />
	<main
		style:--navbar-height="{navbarHeight || 0}px"
		style:--scroll={$mainScroll.y}
		style:--scrollpx="{$mainScroll.y}px"
		class:loading
	>
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
	<Loading containerStyle="position: fixed; top:0; left: 0; width: 100vw; height: 100vh" size={sizes.xlarge} />
{/if}
<MessagesOutlet />

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
		transform-origin: 50vw calc(var(--ty) + 50vh);
		transition: transform 0.75s cubic-bezier(0.25, 0, 0, 1);
	}

	.authing {
		transform: scale(0.98);
	}

	.loading {
		opacity: 0;
	}
</style>
