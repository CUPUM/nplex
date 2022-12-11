<!--
	@component
	## Navbar
	Main navigation bar singleton located in the app's root layout.

-->
<script lang="ts" context="module">
	export const navbarTheme = (function () {
		const { subscribe, set } = writable<ValueOf<typeof ThemeClass> | null>(null);
		return {
			subscribe,
			set,
			reset: () => set(null),
		};
	})();
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { rootScroll } from '$stores/scroll';
	import { editorBase, exploreRoutes, mainRoutes, userBase } from '$utils/routes';
	import { writable } from 'svelte/store';
	import type { ValueOf } from 'ts-essentials';
	import { authModal } from './AppAuthModal.svelte';
	import AppNavbarButton from './AppNavbarButton.svelte';
	import AppNavbarCreateMenu from './AppNavbarCreateMenu.svelte';
	import AppNavbarEditMenu from './AppNavbarEditMenu.svelte';
	import AppNavbarUserMenu from './AppNavbarUserMenu.svelte';
	import type { ThemeClass } from './AppThemes.svelte';

	export let navbarHeight = 0;

	let hidden: boolean;
	let rootPathname: string;
	let thres = navbarHeight || 40;
	let loadingCategoryPath: string | null = '';

	beforeNavigate(({ to }) => {
		if (to && exploreRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
			loadingCategoryPath = to.url.pathname;
		}
	});

	afterNavigate(() => {
		loadingCategoryPath = null;
	});

	$: hidden = $rootScroll.down && $rootScroll.y > thres;
	$: rootPathname = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];
</script>

<header class={$navbarTheme ?? ''} class:hidden bind:clientHeight={navbarHeight}>
	<div class="wrapper">
		<nav class="main">
			<AppNavbarButton round href="/">
				<Logo short style="font-size: larger" />
			</AppNavbarButton>
			{#each mainRoutes as route}
				<AppNavbarButton href={route.pathname} current={route.pathname === rootPathname}>
					{route.title}
				</AppNavbarButton>
			{/each}
		</nav>
		<nav class="category">
			{#each exploreRoutes as r}
				<AppNavbarButton
					href={r.pathname}
					current={$page.url.pathname.startsWith(r.pathname)}
				>
					{r.title}
				</AppNavbarButton>
			{/each}
		</nav>
		<nav class="session">
			{#if $page.data.session}
				<Popover place="bottom" align="end" hover let:open>
					<AppNavbarButton
						equi
						slot="control"
						href={editorBase.pathname}
						current={$page.url.pathname.startsWith(editorBase.pathname)}
						active={open}
					>
						<Icon name="pen-plus" style="font-size: 1.25em" />
					</AppNavbarButton>
					<AppNavbarCreateMenu />
				</Popover>
				<Popover place="bottom" align="end" hover let:open>
					<AppNavbarButton
						equi
						slot="control"
						href={editorBase.pathname}
						current={$page.url.pathname.startsWith(editorBase.pathname)}
						active={open}
					>
						<Icon name="file" style="font-size: 1.25em" />
					</AppNavbarButton>
					<AppNavbarEditMenu />
				</Popover>
				<Popover hover place="bottom" align="end" let:open>
					<Avatar
						active={open}
						slot="control"
						data={$page.data.session.user}
						href={userBase.pathname}
					/>
					<AppNavbarUserMenu />
				</Popover>
			{:else}
				<AppNavbarButton round cta href={authModal.getUrl({ url: $page.url }).toString()}>
					<Icon name="user" thickness="1.5" style="font-size: 1.25em" />
				</AppNavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		z-index: 100;
		top: 0;
		padding: 0 1rem;
		margin: 0;
		font-size: var(--ui-text-sm);
	}

	.wrapper {
		position: relative;
		max-width: var(--ui-size-xl);
		display: grid;
		grid-template-columns:
			[full-start main-start]
			1fr
			[main-end category-start]
			auto
			[category-end session-start]
			1fr
			[session-end full-end];
		grid-auto-flow: dense;
		padding-top: 0.5rem;
		margin: 0 auto;
		flex-direction: row;
		align-items: stretch;
		gap: 3rem;
		@include mobile {
			grid-template-columns:
				[full-start main-start]
				1fr
				[main-end category-start]
				1fr
				[category-end session-start]
				1fr
				[session-end full-end];
		}
	}

	.main,
	.category,
	.session {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3px;
		@include mobile {
			flex-direction: column;
		}
	}
	.main {
		grid-column: main;
		justify-content: flex-start;
	}
	.category {
		grid-column: category;
		justify-content: center;
		background: col(bg, 000, 0.8);
		border-radius: var(--ui-radius-md);
		box-shadow: 0 0 0 var(--ui-inset) col(bg, 000, 0.8);
	}
	.session {
		grid-column: session;
		justify-content: flex-end;
	}
</style>
