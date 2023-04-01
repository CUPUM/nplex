<script lang="ts">
	import { cachedState } from '$actions/cachedState';
	import { intersection } from '$actions/intersection';
	import svgPointer from '$actions/svgPointer';
	import { browser } from '$app/environment';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import { FULL_VIEWBOX, LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import type { AppCustomEvent } from '$types/utils';
	import { col } from '$utils/css';
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { KEY } from '$utils/enums';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import { expoOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { overlapNavbar } from './Navbar.svelte';
	import { setRootBackground } from './RootBackground.svelte';

	export let scrollTarget: HTMLElement;
	export let images: PageData['splashImages'];

	let entered = false;

	const logoChars = ['n', 'p', 'l', 'e', 'x'] as const;

	const logoImgsLoaded = images.map(() => false);

	const circle = spring({ x: 0, y: 0, r: 0 }, { damping: 0.8, stiffness: 0.1 });
	const square = spring({ x: 0, y: 0, s: 0, a: 0 }, { damping: 0.7, stiffness: 0.2 });

	function moveSpotlight(e: AppCustomEvent<'on:svg.pointermove'>) {
		circle.update((prev) => ({
			x: e.detail.x,
			y: e.detail.y,
			r:
				4 *
					(Math.abs(e.detail.originalEvent.movementX) +
						Math.abs(e.detail.originalEvent.movementY)) +
				100,
		}));
		square.update((prev) => ({
			x: e.detail.x,
			y: e.detail.y,
			s:
				3 *
					(Math.abs(e.detail.originalEvent.movementX) +
						Math.abs(e.detail.originalEvent.movementY)) +
				250,
			a:
				prev.a +
				0.2 * Math.round(e.detail.originalEvent.movementX + e.detail.originalEvent.movementY),
		}));
	}

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

	const angle = (Math.random() * 360).toFixed(0);
</script>

<header
	use:overlapNavbar={{ theme: THEMES.dark, background: col('bg', '300') }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.dark.bg[300] }}
	use:intersection
	on:intersection.enter|once={() => {
		entered = true;
	}}
	data-theme={THEMES.dark}
	style:--angle="{angle}deg"
>
	<svg
		id="splash-logo"
		use:svgPointer
		on:svg.pointermove={moveSpotlight}
		viewBox={FULL_VIEWBOX}
		vector-effect="non-scaling-stroke"
	>
		<mask id="spotlight">
			<rect
				x={$square.x - $square.s}
				y={$square.y - $square.s}
				width={2 * $square.s}
				height={2 * $square.s}
				transform="rotate({$square.a})"
				fill="white"
				opacity=".7"
				rx="50"
			/>
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill="white" />
		</mask>
		<mask id="spotlight-reverse">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<rect
				x={$square.x - $square.s}
				y={$square.y - $square.s}
				width={2 * $square.s}
				height={2 * $square.s}
				transform="rotate({$square.a})"
				fill="black"
				opacity=".8"
				rx="50"
			/>
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill="black" />
		</mask>
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
						href={getProjectImageUrl(image.storage_name ?? '')}
					/>
				</pattern>
			{/each}
		</defs>
		{#if entered && logoImgsLoaded.every((loaded) => loaded)}
			<g mask="url(#spotlight)">
				{#each logoChars as char, i (char)}
					<use
						in:fly={{ y: 30, delay: 250 + 50 * i }}
						href={LOGO_SYMBOLS_HREFS[char]}
						out:fade|local
						fill="url(#splash-image-{i})"
					/>
				{/each}
			</g>
			<g mask="url(#spotlight-reverse)">
				{#each logoChars as char, i (char)}
					<use
						in:fly={{ y: 30, delay: 250 + 50 * i }}
						href={LOGO_SYMBOLS_HREFS[char]}
						out:fade|local
						fill="none"
						stroke={col('fg', '000')}
						stroke-width="1.5"
						stroke-dasharray="10 5"
					/>
				{/each}
			</g>
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
		// padding-inline: 3rem;
		// background: linear-gradient(var(--angle), col(bg, 300), col(bg, 100));
		background-color: col(bg, 300);
		border-bottom-left-radius: var(--splash-radius);
		border-bottom-right-radius: var(--splash-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: calc(-1 * var(--ui-nav-h));
		overflow: hidden;
		transition: border-radius 0.15s ease-out;
	}

	#splash-logo {
		will-change: transform;
		position: relative;
		padding-inline: var(--ui-gutter-lg);
		width: 100%;
		height: 100%;
		object-fit: contain;
		max-width: var(--ui-width-main);
		opacity: max(0, calc(1 - 0.001 * var(--ui-scroll)));
	}

	g {
		transform: translateY(calc(0.2 * var(--ui-scroll-px)));
	}

	mask {
		circle {
			filter: drop-shadow(12px 24px 32px rgb(0, 0, 0, 0.75));
		}
		rect {
			transform-box: fill-box;
			transform-origin: bottom center;
		}
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
