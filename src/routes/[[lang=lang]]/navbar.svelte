<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import Avatar from '$lib/components/primitives/avatar.svelte';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { removeLang } from '$lib/i18n/location';
	import { Settings, UserRound } from 'lucide-svelte';
	import NavbarButton from './navbar-button.svelte';
	import NavbarMenuSettings from './navbar-menu-settings.svelte';
	import NavbarMenuUser from './navbar-menu-user.svelte';
	import NavbarThumb from './navbar-thumb.svelte';

	let withoutLang = $derived(removeLang($page.url.href.replace($page.url.origin, '')));
</script>

<div class="px-padding mb-navbar-margin-bottom z-frontmost sticky top-0">
	<header id="navbar">
		<nav class="navbar-group justify-self-start">
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
		<nav class="navbar-group justify-self-center">
			<NavbarButton href="/projects" currentOnSubpath>
				<NavbarThumb current={withoutLang.startsWith('/projects')} key="explore" />
				{m.projects()}
			</NavbarButton>
			<NavbarButton href="/organizations" currentOnSubpath>
				<NavbarThumb current={withoutLang.startsWith('/organizations')} key="explore" />
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
						<NavbarButton data-square {...attributes} class="rounded-full">
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

<style>
	#navbar {
		padding-block: var(--spacing-padding);
		margin-inline: auto;
		display: grid;
		grid-template-columns: [site-start]1fr[site-end explore-start]auto[explore-end user-start]1fr[user-end];
		width: 100%;
		max-width: var(--width-xl);
		grid-auto-flow: dense;
		align-self: center;
		font-size: var(--font-size-sm);
		transition: all var(--transition-duration-slow) var(--transition-timing-function-in-out);
	}

	:global(:root:is([data-presentation='full-width'], [data-presentation='full-screen'])) {
		#navbar {
			max-width: 100%;
		}
	}
</style>
