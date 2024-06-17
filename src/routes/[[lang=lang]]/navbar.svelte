<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import Avatar from '$lib/components/primitives/avatar.svelte';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { removeLang } from '$lib/i18n/location';
	import { Settings, UserRound } from 'lucide-svelte';
	import { circInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import NavbarButton from './navbar-button.svelte';
	import NavbarMenuSettings from './navbar-menu-settings.svelte';
	import NavbarMenuUser from './navbar-menu-user.svelte';

	let withoutLang = $derived(removeLang($page.url.href.replace($page.url.origin, '')));

	const [sendThumb, receiveThumb] = crossfade({
		duration: 250,
		easing: circInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.5, duration: 150, easing: expoOut, opacity: 0 });
		},
	});
</script>

<div id="navbar-wrapper">
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
			<NavbarButton href="/projects">
				{#if withoutLang.startsWith('/projects')}
					<div
						class="rounded-inherit bg-primary/15 absolute inset-0"
						in:receiveThumb={{ key: 'explore' }}
						out:sendThumb={{ key: 'explore' }}
					></div>
				{/if}
				{m.projects()}
			</NavbarButton>
			<NavbarButton href="/organizations">
				{#if withoutLang.startsWith('/organizations')}
					<div
						class="rounded-inherit bg-primary/15 absolute inset-0"
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
	#navbar-wrapper {
		padding-inline: var(--spacing-padding);
		margin-bottom: var(--spacing-navbar-margin-bottom);
		position: sticky;
		top: 0;
		z-index: var(--z-index-frontmost);

		/* &::after {
			content: '';
			z-index: -1;
			position: absolute;
			top: -100%;
			left: 0;
			right: 0;
			bottom: 0;
			translate: 0 min(0%, calc(-50% + 0.1 * var(--scroll-y-px)));
			background: linear-gradient(var(--background-color-base) 50%, transparent);
			backdrop-filter: blur(var(--blur-md));
			transition: all var(--transition-duration-xfast) ease-out;
		} */

		&::after {
			--offset: var(--spacing-gutter);
			content: '';
			z-index: -1;
			position: absolute;
			top: -100%;
			left: 0;
			right: 0;
			bottom: 0;
			translate: 0 min(0%, calc(-50% + var(--scroll-y-px)));
			border-bottom-left-radius: calc(var(--radius-lg) - 0.25 * var(--scroll-y-px));
			border-bottom-right-radius: calc(var(--radius-lg) - 0.25 * var(--scroll-y-px));
			background: color-mix(
				in srgb,
				var(--background-color-base) min(90%, var(--scroll-y) * 0.5%),
				transparent
			);
			backdrop-filter: blur(var(--blur-md));
			transition: all 100ms ease-out;
		}
	}

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
