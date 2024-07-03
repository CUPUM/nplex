<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import NavbarThumb from '$lib/components/patterns/navbar-thumb.svelte';
	import Avatar from '$lib/components/primitives/avatar.svelte';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { removeLang } from '$lib/i18n/location';
	import { Settings, UserRound } from 'lucide-svelte';
	import NavbarButton from '../../lib/components/patterns/navbar-button.svelte';
	import NavbarMenuSettings from './navbar-menu-settings.svelte';
	import NavbarMenuUser from './navbar-menu-user.svelte';

	let withoutLang = $derived(removeLang($page.url.href.replace($page.url.origin, '')));
</script>

<div class="px-padding z-frontmost pointer-events-none sticky top-0">
	<header
		class="py-padding duration-slow max-w-main mx-auto grid w-full grid-flow-dense grid-cols-[[site-start]1fr[site-end_explore-start]auto[explore-end_user-start]1fr[user-end]] text-sm transition-all ease-in-out group-data-[presentation='full-width']/root:max-w-full group-data-[presentation='full-screen']/root:max-w-full"
	>
		<nav
			class="gap-input-group-gutter pointer-events-auto flex flex-row justify-self-start *:pointer-events-auto"
		>
			<NavbarButton href="/" data-logo>
				<Logo id="navbar-logo" height="2em" delay={500} />
			</NavbarButton>
			<NavbarButton href="/about">
				{m.about()}
			</NavbarButton>
			<NavbarButton href="/guides">
				{m.guides()}
			</NavbarButton>
		</nav>
		<nav class="gap-input-group-gutter pointer-events-auto flex flex-row justify-self-center">
			<NavbarButton href="/projects" currentOnSubpath>
				<NavbarThumb current={withoutLang.startsWith('/projects')} key="explore" />
				{m.projects()}
			</NavbarButton>
			<NavbarButton href="/organizations" currentOnSubpath>
				<NavbarThumb current={withoutLang.startsWith('/organizations')} key="explore" />
				{m.organizations()}
			</NavbarButton>
		</nav>
		<nav class="gap-input-group-gutter pointer-events-auto flex flex-row justify-self-end">
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
						<NavbarButton data-square {...attributes} class="rounded-full!">
							<Avatar {...$page.data.user!} class="rounded-inherit absolute" />
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
					<UserRound />
				</NavbarButton>
			{/if}
		</nav>
	</header>
</div>
