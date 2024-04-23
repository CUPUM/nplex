<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { languageTag } from '$i18n/runtime';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { removeLang } from '$lib/i18n/location';
	import { Languages } from 'lucide-svelte';
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
		<NavbarButton href="/">
			<Logo height="1.5em" />
		</NavbarButton>
		<NavbarButton href="/about">
			{m.about()}
		</NavbarButton>
		<NavbarButton href="/guides">
			{m.guides()}
		</NavbarButton>
	</nav>
	<nav class="gap-outline-focus col-[explore] flex flex-row">
		<NavbarButton href="/projects">
			<div class="" />
			{m.projects()}
		</NavbarButton>
		<NavbarButton href="/organizations">
			<div class="" />
			{m.organizations()}
		</NavbarButton>
	</nav>
	<nav class="gap-outline-focus col-[user] flex flex-row justify-self-end">
		<NavbarButton class="group gap-brick-gap">
			<Languages />
			<span
				class="opacity-soft flex items-center rounded-full border border-current py-[0.25rem] px-[0.5rem] text-xs transition-all group-hover:opacity-100"
			>
				{LANG_DETAILS[languageTag()].label}
			</span>
		</NavbarButton>
	</nav>
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
