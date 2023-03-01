<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { browser } from '$app/environment';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import { FULL_VIEWBOX, LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import { col } from '$utils/css';
	import { KEY } from '$utils/enums';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import { fade, fly } from 'svelte/transition';
	import { overlapNavbar } from './Navbar.svelte';
	import { setRootBackground } from './RootBackground.svelte';

	export let scrollTarget: HTMLElement;

	let entered = false;

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
	on:intersection.enter={() => {
		entered = true;
	}}
	on:intersection.leave={() => {
		entered = false;
	}}
	data-theme={THEMES.dark}
>
	<svg viewBox={FULL_VIEWBOX} on:click={consult} on:keydown={keydown}>
		{#if entered}
			<use in:fly={{ y: 30, delay: 250 }} href={LOGO_SYMBOLS_HREFS.n} out:fade|local />
			<use in:fly={{ y: 30, delay: 300 }} href={LOGO_SYMBOLS_HREFS.p} out:fade|local />
			<use in:fly={{ y: 30, delay: 350 }} href={LOGO_SYMBOLS_HREFS.l} out:fade|local />
			<use in:fly={{ y: 30, delay: 400 }} href={LOGO_SYMBOLS_HREFS.e} out:fade|local />
			<use in:fly={{ y: 30, delay: 450 }} href={LOGO_SYMBOLS_HREFS.x} out:fade|local />
		{/if}
	</svg>
	<button on:click={consult} class={ICON_CLASS.hover}>
		<div class="arrow">
			<Icon name="arrow-down" strokeWidth={3} />
		</div>
	</button>
</header>

<style lang="scss">
	header {
		--radius: min(var(--ui-radius-2xl), calc(var(--ui-scroll-y) * 0.15));
		position: relative;
		height: 100svh;
		width: 100%;
		background: col(bg, 300);
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: calc(-1 * var(--ui-nav-h));
		// transition: border-radius 0.15s ease-out;
	}

	svg {
		cursor: pointer;
		width: 250px;
		fill: col(fg, 700);
	}

	button {
		cursor: pointer;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 1.5rem;
		color: col(fg, 700);
		font-size: 3rem;
		width: 5rem;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		outline: none;
		border: none;
		transition: all 0.25s;

		&:hover,
		&:focus-visible {
			background: col(primary, 100, 0.1);
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
		opacity: 0.15;
		transform: translateY(-0.25em);
		transition: all 0.35s var(--ui-ease-out);
	}
</style>
