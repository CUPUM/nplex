<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { link, removeLang } from '$lib/i18n/link.svelte';
	import { onMount } from 'svelte';
	import { circInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import NavbarButton from '../patterns/navbar-button.svelte';

	let mounted = $state(false);
	let withoutLang = $derived(removeLang($page.url.href.replace($page.url.origin, '')));

	const [sendThumb, receiveThumb] = crossfade({
		duration: 175,
		easing: circInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.5, duration: 150, easing: expoOut, opacity: 0 });
		},
	});

	onMount(() => {
		mounted = true;
	});
</script>

<!-- <header id="navbar" class={$page.data.setout}> -->
<header
	class="p-gutter z-50 grid grid w-full max-w-xl grid-flow-dense [grid-template-columns:[site-start]1fr[site-end_explore-start]auto[explore-end_user-start]1fr[user-end]] grid-rows-1 self-center"
>
	<nav class="gap-outline-focus col-[site] flex flex-row">
		<NavbarButton {...link('/')} data-square>
			<Logo size="1.5em" />
		</NavbarButton>
		<NavbarButton {...link('/about')}>
			{m.about()}
		</NavbarButton>
		<NavbarButton {...link('/guides')}>
			{m.guides()}
		</NavbarButton>
	</nav>
	<nav class="gap-outline-focus col-[explore] flex flex-row">
		<NavbarButton {...link('/projects')}>
			<div class="" />
			{m.projects()}
		</NavbarButton>
		<NavbarButton {...link('/organizations')}>
			<div class="" />
			{m.organizations()}
		</NavbarButton>
	</nav>
	<nav class="gap-outline-focus col-[user] flex flex-row"></nav>
	<!-- <nav class="navbar-group user">
		<Dropdown let:trigger>
			<button class="navbar-button" use:ripple use:melt={trigger}>
				<Languages />
				<span class="navbar-button-label">{LANG_DETAILS[$page.data.lang].label}</span>
			</button>
			<svelte:fragment slot="content" let:item>
				{#each availableLanguageTags as lang}
					<a
						class="dropdown-item"
						use:melt={item}
						href={withLang(withoutLang, lang)}
						hreflang={lang}
						data-sveltekit-noscroll
						data-sveltekit-replacestate
						data-current={$page.data.lang === lang ? true : undefined}
					>
						{LANG_DETAILS[lang].name}
					</a>
				{/each}
			</svelte:fragment>
		</Dropdown>
		<button
			class="navbar-button square"
			use:ripple
			on:click={(e) => {
				mode.toggle();
				return e;
			}}
		>
			<NavbarModeIcon />
		</button>
		n {#if $page.data.user}
			<NavbarMenu let:trigger>
				<button class="navbar-button square" use:ripple use:melt={trigger}>
					<Avatar {...$page.data.user} />
					{#if !$page.data.user.emailVerified}
						<div class="badge">
							<MailWarning />
						</div>
					{/if}
				</button>
				<NavbarMenuUser
					slot="content"
					let:close
					let:title
					let:description
					{close}
					{title}
					{description}
				/>
			</NavbarMenu>
		{:else}
			<a
				class="navbar-button square"
				href={withLang('/login')}
				aria-current={['/login', '/signup', '/reset-password'].some((authRoute) =>
					withoutLang.startsWith(authRoute)
				) || undefined}
			>
				<User2 />
			</a>
		{/if}
	</nav> -->
</header>

<!-- <style>
	#navbar {
		z-index: 999;
		display: grid;
		position: relative;
		align-self: center;
		grid-template-columns: 1fr auto 1fr;
		padding: var(--gutter);
		width: 100%;
		max-width: var(--width-lg);
		transition: max-width 0.35s var(--ease-expo);

		:global(:--setout-full-width) & {
			max-width: 100%;
		}

		@media (--md) {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.navbar-group {
		display: flex;
		flex-direction: row;
		gap: var(--ring-width);
	}

	.site {
		justify-content: flex-start;
	}

	.explore {
		justify-content: center;
		/* backdrop-filter: blur(6px); */

		.navbar-button {
			backdrop-filter: unset;
		}

		@media (--md) {
			display: none;
		}
	}

	.user {
		justify-content: flex-end;
	}

	.navbar-button {
		position: relative;
		font-weight: var(--weight-bold);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		block-size: var(--block-size);
		padding-inline: var(--padding-inline);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: all var(--duration-xfast) ease-out;

		&.square {
			padding-inline: 0;
			aspect-ratio: 1;
		}

		:global(:--icon) {
			width: 1.25em;
			stroke-width: 2.5;
		}

		&:hover {
			color: var(--primary-fg);
		}

		&:focus-visible {
			outline: var(--ring);
		}

		&[data-current] {
		}
	}

	.navbar-button-label {
		display: flex;
		align-items: center;
		font-size: var(--text-xs);
		padding: 0.2rem 0.5rem;
		opacity: 0.75;
		border-radius: var(--rounded);
		box-shadow: 0 0 2px -0.5px currentColor;
		transition: all 0.1s ease-out;

		.navbar-button:hover &,
		.navbar-button[data-state='open'] & {
			color: var(--color-neutral-100);
			background: var(--color-primary-700);
			box-shadow: 0 0 0 -0.5px currentColor;
			opacity: 1;
		}
	}
</style> -->
