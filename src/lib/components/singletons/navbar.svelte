<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { removeLang } from '$lib/i18n/location';
	import { Settings, User2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { circInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import NavbarButton from '../patterns/navbar-button.svelte';
	import NavbarMenu from '../patterns/navbar-menu.svelte';

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
	<nav class="gap-outline-focus col-[explore] flex flex-row">
		<NavbarButton href="/projects">
			{#if withoutLang.startsWith('/projects')}
				<div
					class="rounded-inherit bg-input absolute inset-0"
					in:receiveThumb={{ key: 'explore' }}
					out:sendThumb={{ key: 'explore' }}
				/>
			{/if}
			{m.projects()}
		</NavbarButton>
		<NavbarButton href="/organizations">
			{#if withoutLang.startsWith('/organizations')}
				<div
					class="rounded-inherit bg-input absolute inset-0"
					in:receiveThumb={{ key: 'explore' }}
					out:sendThumb={{ key: 'explore' }}
				/>
			{/if}
			{m.organizations()}
		</NavbarButton>
	</nav>
	<nav class="gap-outline-focus col-[user] flex flex-row justify-self-end">
		<NavbarButton data-square>
			<Settings />
		</NavbarButton>
		{#if $page.data.user}
			<NavbarMenu let:trigger>
				<!-- <button class="navbar-button square" use:ripple use:melt={trigger}>
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
				/> -->
			</NavbarMenu>
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
		<!-- <NavbarButton class="group gap-brick-gap">
			<Languages />
			<span
				class="opacity-soft flex items-center rounded-full border border-current py-[0.25rem] px-[0.5rem] text-xs transition-all group-hover:opacity-100"
			>
				{LANG_DETAILS[languageTag()].label}
			</span>
		</NavbarButton> -->
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
	</nav> -->
</header>
