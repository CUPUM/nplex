<script lang="ts">
	import { cachedState } from '$actions/cachedState';
	import { intersection } from '$actions/intersection';
	import { browser } from '$app/environment';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import { FULL_VIEWBOX, LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import { col } from '$utils/css';
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { KEY } from '$utils/enums';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import { expoOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { overlapNavbar } from './Navbar.svelte';
	import { setRootBackground } from './RootBackground.svelte';

	export let scrollTarget: HTMLElement;
	export let images: PageData['splashImages'];

	let entered = false;

	const logoChars = ['n', 'p', 'l', 'e', 'x'] as const;

	const logoImgsLoaded = images.map(() => false);

	function consult() {
		if (browser) {
			scrollTarget.scrollIntoView({
				block: 'start',
				behavior: 'smooth',
			});
		}
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === KEY.Enter || e.key === KEY.ArrowDown) {
			consult();
		}
	}
</script>

<header
	use:overlapNavbar={{ theme: THEMES.dark, background: col('bg', '300') }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.dark.bg[300] }}
	use:intersection
	on:intersection.enter|once={() => {
		entered = true;
	}}
	data-theme={THEMES.dark}
>
	<svg class="logo" viewBox={FULL_VIEWBOX} on:click={consult} on:keydown={keydown}>
		<defs>
			{#each images as image, i (image.id)}
				<pattern
					id="splash-image-{i}"
					patternContentUnits="userSpaceOnUse"
					patternUnits="objectBoundingBox"
					width="100%"
					height="100%"
				>
					<image
						x="0"
						y="0"
						height="100%"
						preserveAspectRatio="xMidYMid"
						use:cachedState
						on:load|once={() => (logoImgsLoaded[i] = true)}
						on:error|once={() => (logoImgsLoaded[i] = true)}
						href={getProjectImageUrl(image.name ?? '')}
					/>
				</pattern>
			{/each}
		</defs>
		{#if entered && logoImgsLoaded.every((loaded) => loaded)}
			{#each logoChars as char, i (char)}
				<use
					in:fly={{ y: 30, delay: 250 + 50 * i }}
					href={LOGO_SYMBOLS_HREFS[char]}
					out:fade|local
					fill="url(#splash-image-{i})"
				/>
			{/each}
		{/if}
	</svg>
	{#if entered}
		<button
			in:fly={{ y: -6, delay: 500, duration: 1200, easing: expoOut }}
			on:click={consult}
			class={ICON_CLASS.hover}
		>
			<div class="arrow">
				<Icon name="arrow-down" strokeWidth={3} />
			</div>
		</button>
	{/if}
</header>

<style lang="scss">
	header {
		--splash-radius: min(var(--ui-radius-2xl), calc(var(--ui-scroll-px) * 0.15));
		position: relative;
		height: 100svh;
		width: 100%;
		padding-block: var(--ui-nav-h);
		background: col(bg, 300);
		border-bottom-left-radius: var(--splash-radius);
		border-bottom-right-radius: var(--splash-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: calc(-1 * var(--ui-nav-h));
		overflow: hidden;
		transition: border-radius 0.15s ease-out;
	}

	.logo {
		will-change: transform;
		position: relative;
		transform: translate3d(0, calc(0.5 * var(--ui-scroll-px)), 0);
		cursor: pointer;
		width: 100%;
		object-fit: contain;
		max-width: var(--ui-width-main);
		padding: 3rem 4rem;
		opacity: max(0, calc(1 - 0.001 * var(--ui-scroll)));
		overflow: visible;
	}

	button {
		z-index: 10;
		cursor: pointer;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 1.5rem;
		color: col(fg, 700);
		// background-color: col(bg, 300, 0.2);
		font-size: 3rem;
		width: 5rem;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		outline: none;
		border: none;
		transition: all 0.25s;

		&:hover,
		&:focus-visible {
			background-color: col(primary, 100, 0.2);
			color: col(primary, 500);
			.arrow {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}

	.arrow {
		display: flex;
		align-items: center;
		opacity: 0.2;
		transform: translateY(-0.25em);
		transition: all 0.35s var(--ui-ease-out);
	}
</style>
