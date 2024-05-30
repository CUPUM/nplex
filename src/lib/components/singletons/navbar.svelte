<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { removeLang } from '$lib/i18n/location';
	import { Settings, User, User2 } from 'lucide-svelte';
	import { circInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import NavbarButton from '../patterns/navbar-button.svelte';
	import NavbarMenuSettings from './navbar-menu-settings.svelte';
	import NavbarMenuUser from './navbar-menu-user.svelte';

	let withoutLang = $derived(removeLang($page.url.href.replace($page.url.origin, '')));

	const [sendThumb, receiveThumb] = crossfade({
		duration: 175,
		easing: circInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.5, duration: 150, easing: expoOut, opacity: 0 });
		},
	});
</script>

<header id="navbar">
	<nav class="navbar-group justify-self-start">
		<NavbarButton href="/" class="px-[0.75em]">
			<Logo height="2em" />
		</NavbarButton>
		<NavbarButton href="/about">
			{m.about()}
		</NavbarButton>
		<NavbarButton href="/guides">
			{m.guides()}
		</NavbarButton>
	</nav>
	<nav class="navbar-group justify-self-center">
		<NavbarButton href="/projects">
			{#if withoutLang.startsWith('/projects')}
				<div
					class="rounded-inherit bg-input absolute inset-0"
					in:receiveThumb={{ key: 'explore' }}
					out:sendThumb={{ key: 'explore' }}
				></div>
			{/if}
			{m.projects()}
		</NavbarButton>
		<NavbarButton href="/organizations">
			{#if withoutLang.startsWith('/organizations')}
				<div
					class="rounded-inherit bg-input absolute inset-0"
					in:receiveThumb={{ key: 'explore' }}
					out:sendThumb={{ key: 'explore' }}
				></div>
			{/if}
			{m.organizations()}
		</NavbarButton>
	</nav>
	<nav class="navbar-group justify-self-end">
		<NavbarMenuSettings>
			{#snippet trigger(attributes)}
				<NavbarButton data-square {...attributes}>
					<Settings />
				</NavbarButton>
			{/snippet}
		</NavbarMenuSettings>
		{#if $page.data.user}
			<NavbarMenuUser>
				{#snippet trigger(attributes)}
					<NavbarButton data-square {...attributes}>
						<User />
					</NavbarButton>
				{/snippet}
			</NavbarMenuUser>
		{:else}
			<NavbarButton
				data-square
				href="/login"
				aria-current={['/login', '/signup', '/reset-password'].some((authRoute) =>
					withoutLang.startsWith(authRoute)
				)
					? 'page'
					: undefined}
			>
				<User2 />
			</NavbarButton>
		{/if}
	</nav>
</header>
