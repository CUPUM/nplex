<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags } from '$i18n/runtime';
	import { ripple } from '$lib/actions/ripple';
	import { breakpoint } from '$lib/breakpoints/breakpoints';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { langSwitch, link } from '$lib/i18n/link';
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { transform } from '$lib/motion/transform';
	import { KEYS } from '$lib/utils/constants';
	import { melt, type DialogElements, type DialogStates } from '@melt-ui/svelte';
	import { Languages, Scroll, SunMoon, X } from 'lucide-svelte';
	import { cubicIn, expoIn, expoOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import LangKey from './LangKey.svelte';

	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let close: DialogElements['close'];
	export let open: DialogStates['open'];
	// export let title: DialogElements['title'];
	// export let description: DialogElements['description'];
</script>

{#if $open}
	<div
		use:melt={$overlay}
		id="navdrawer-overlay"
		in:fade={{ duration: 250 }}
		out:fade={{ duration: 350 }}
	/>
	<menu use:melt={$content} id="navdrawer-content">
		<div>
			<button
				use:melt={$close}
				id="navdrawer-close"
				use:ripple={{ colorStart: 'var(--color-error-200)' }}
				in:scale={{ start: 0.75, delay: 225, duration: 250, easing: expoOut }}
				out:scale={{ start: 0.9, delay: 0, duration: 100, easing: expoIn }}
			>
				<X size="1.5em" strokeWidth="2.5" />
			</button>
		</div>
		<!-- svelte-ignore a11y-missing-attribute -->
		<nav
			id="navdrawer-site"
			class="section"
			in:scale={{ start: 0.9, duration: 250, easing: expoOut }}
			out:scale={{ start: 0.9, duration: 100, easing: expoIn }}
		>
			<h2><Scroll size="2em" />Sections</h2>
			<div class="inner">
				<a use:melt={$close} class="drawerbutton" use:ripple {...$link('/about')}>
					<LangKey>
						{m.about()}
					</LangKey>
				</a>
				<a use:melt={$close} class="drawerbutton" use:ripple {...$link('/guides')}>
					<LangKey>
						{m.guides()}
					</LangKey>
				</a>
				{#if !$breakpoint?.md}
					<a use:melt={$close} class="drawerbutton" use:ripple {...$link('/projects')}>
						<LangKey>
							{m.projects()}
						</LangKey>
					</a>
					<a use:melt={$close} class="drawerbutton" use:ripple {...$link('/organizations')}>
						<LangKey>
							{m.orgs()}
						</LangKey>
					</a>
				{/if}
			</div>
		</nav>
		<section
			id="navdrawer-lang"
			class="section"
			in:scale={{ start: 0.9, delay: 75, duration: 250, easing: expoOut }}
			out:scale={{ start: 0.9, duration: 100, delay: 50, easing: expoIn }}
		>
			<h2>
				<Languages size="2em" />
				<LangKey>
					{m.lang()}
				</LangKey>
			</h2>
			<div class="inner">
				{#each availableLanguageTags as lang}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						class="drawerbutton"
						{...$langSwitch(lang)}
						use:ripple
						data-current={$page.data.lang === lang ? true : undefined}
						data-sveltekit-noscroll
						data-sveltekit-replacestate
					>
						{LANG_DETAILS[lang].name}
					</a>
				{/each}
			</div>
		</section>
		<section
			id="navdrawer-mode"
			class="section"
			in:scale={{ start: 0.9, delay: 150, duration: 250, easing: expoOut }}
			out:scale={{ start: 0.9, duration: 100, delay: 100, easing: expoIn }}
		>
			<h2>
				<SunMoon size="2em" />
				<LangKey>{m.mode()}</LangKey>
			</h2>
			<div class="inner">
				<button
					class="drawerbutton"
					use:ripple
					on:pointerdown={mode.toggle}
					on:keydown={(e) => {
						if (e.key === KEYS.SPACE || e.key === KEYS.ENTER) {
							mode.toggle();
						}
					}}
				>
					<div class="button-icon">
						{#key $mode}
							<div
								class="button-icon-inner"
								in:transform={{
									scale: 0.75,
									rotate: [0, 0, -90],
									duration: 500,
									delay: 150,
									easing: expoOut,
									opacity: 1,
								}}
								out:transform={{
									scale: 0.5,
									rotate: [0, 0, 90],
									duration: 250,
									easing: cubicIn,
									opacity: 1,
								}}
							>
								<svelte:component this={MODES_DETAILS[$mode].icon} size="1.5em" />
							</div>
						{/key}
					</div>
					<LangKey>{MODES_DETAILS[$mode].title()}</LangKey>
				</button>
			</div>
		</section>
	</menu>
{/if}

<style lang="postcss">
	#navdrawer-overlay {
		position: fixed;
		inset: 0;
		z-index: 101;
		opacity: 0.98;
		background: linear-gradient(180deg, var(--color-neutral-100) 25%, transparent 125%);
		:global(:--dark) & {
			background: linear-gradient(180deg, var(--color-neutral-950) 25%, transparent 125%);
		}
	}

	#navdrawer-content {
		pointer-events: none;
		font-size: var(--size-md);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: min-content;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		position: fixed;
		inset: 0;
		z-index: 101;
		padding: 1rem;
		gap: 0.75rem;
		&:focus {
			outline: none;
		}

		@media (--md) {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	}

	.section {
		display: flex;
		flex-direction: column;
		transform-origin: center;
		pointer-events: initial;
		border-radius: var(--radius-3xl);
		background-color: var(--color-neutral-50);
		:global(:--dark) & {
			background-color: var(--color-neutral-900);
		}
	}

	.inner {
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
		gap: 0.25rem;
	}

	#navdrawer-close {
		position: relative;
		align-self: flex-start;
		pointer-events: initial;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--size-sm);
		padding: 1.25rem;
		border-radius: var(--radius-full);
		color: var(--color-error-500);
		background-color: var(--color-neutral-50);
		transition: all 0.15s ease-out;
		:global(:--dark) & {
			background-color: var(--color-neutral-900);
		}
		&:hover,
		&:focus-visible {
			color: var(--color-error-950);
			background-color: var(--color-error-300);
			transform: rotate(90deg);
			:global(:--dark) & {
				color: var(--color-error-50);
				background-color: var(--color-error-700);
			}
		}
		&:active {
			transform: rotate(180deg) scale(0.9);
		}
	}

	#navdrawer-site {
		grid-column: 1 / 3;
	}

	#navdrawer-lang {
	}

	#navdrawer-mode {
	}

	.button-icon {
		position: relative;
		aspect-ratio: 1;
		width: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-icon-inner {
		position: absolute;
		transform-origin: center 200%;
	}

	h2 {
		text-transform: uppercase;
		padding: 2rem;
		border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent);
		opacity: 0.5;
		font-size: var(--size-2xs);
		letter-spacing: 0.1em;
		font-weight: 500;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}

	.drawerbutton {
		display: flex;
		flex-direction: row;
		gap: 1.5em;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		padding: 1.625rem;
		border-radius: var(--radius-full);
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.1s ease-out;

		&[data-current] {
			cursor: default;
			color: var(--color-primary-500);
			box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-500) 25%, transparent);
		}

		&:hover:not([data-current]),
		&:focus-visible:not([data-current]) {
			color: var(--color-primary-500);
			background-color: color-mix(in srgb, var(--color-primary-300) 20%, transparent);
			:global(:--dark) & {
				background-color: color-mix(in srgb, var(--color-primary-700) 20%, transparent);
			}
		}
	}
</style>
