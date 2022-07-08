<script lang="ts" context="module">
	import { afterNavigate, goto } from '$app/navigation';
	import { getStores, session } from '$app/stores';
	import Auth from '$components/complexes/Auth.svelte';
	import Footer from '$components/complexes/Footer.svelte';
	import MessagesOutlet from '$components/complexes/MessagesOutlet.svelte';
	import Navbar from '$components/complexes/Navbar.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { authModal } from '$stores/auth';
	import { backgroundColor } from '$stores/backgroundColor';
	import '$styles/app.scss';
	import '$styles/helpers.scss';
	import '$styles/vars.css';
	import { colors } from '$utils/colors';
	import { db, getUserRole } from '$utils/database';
	import { SearchParam } from '$utils/keys';
	import { sizes } from '$utils/sizes';
	import { toUserRoleEnum } from '$utils/user';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				category: null,
				showCategoryNav: false,
				showExploreSearchbar: false,
				showFooter: true,
			},
		};
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';

	/**
	 * Updating the client session's prevUrl used for redirects on guard fail.
	 */
	afterNavigate(({ from, to }) => {
		const newPrevUrl = to;
		newPrevUrl.searchParams.delete(SearchParam.AuthModal);
		session.update((prev) => ({ ...prev, prevUrl: newPrevUrl.toString() }));
	});

	const { page } = getStores(); // Getting the page store this way since we are getting its value outside component initialization, in the below callback

	/**
	 * Listening to and handling client-side Supabase auth state change.
	 */
	db.auth.onAuthStateChange(async (e, s) => {
		if (browser && e === 'SIGNED_OUT') {
			session.update((prevSession) => {
				const rootPath = get(page).url.hostname;
				return { ...prevSession, prevUrl: rootPath, user: null };
			});
			return goto(get(page).url);
		}
		const role = toUserRoleEnum(await getUserRole());
		session.update((prevSession) => ({ ...prevSession, user: { ...s.user, role } }));
	});
	/**
	 * On initializing the website client-side, let's attempt to login with previously set cookie-token (if any).
	 */
	db.auth.refreshSession();

	let loading = true;
	let navbarHeight: number;

	backgroundColor.init();

	onMount(() => {
		setTimeout(() => {
			loading = false;
		}, 500);
	});
</script>

<Navbar bind:navbarHeight />
<main style:--navbar-height="{navbarHeight}px">
	<slot />
</main>
{#if $page.stuff.showFooter}
	<Footer />
{/if}
<!-- Add general modal / message outlet -->
{#if $authModal}
	<Auth />
{/if}
{#if loading}
	<Loading
		backgroundColor={colors.light[100]}
		containerStyle="position: fixed; top:0; left: 0; width: 100vw; height: 100vh"
		size={sizes.xlarge}
	/>
{/if}
<MessagesOutlet />

<style lang="scss">
	main {
		position: relative;
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
	}
</style>
