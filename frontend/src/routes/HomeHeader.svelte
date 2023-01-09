<script lang="ts">
	import { browser } from '$app/environment';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import { FULL_VIEWBOX, LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import { THEMES } from '$utils/themes';
	import { fly } from 'svelte/transition';
	import { setNavbarTheme } from './Navbar.svelte';

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
		if (e.key === 'Enter' || e.key === 'ArrowDown') {
			consult();
		}
	}
</script>

<header
	use:setNavbarTheme={THEMES.dark}
	on:enter={() => {
		entered = true;
	}}
	on:leave={() => {
		entered = false;
	}}
	data-theme={THEMES.dark}
>
	<svg viewBox={FULL_VIEWBOX} on:click={consult} on:keydown={keydown}>
		{#if entered}
			<use in:fly={{ y: 30, delay: 250 }} href={LOGO_SYMBOLS_HREFS.n} />
			<use in:fly={{ y: 30, delay: 300 }} href={LOGO_SYMBOLS_HREFS.p} />
			<use in:fly={{ y: 30, delay: 350 }} href={LOGO_SYMBOLS_HREFS.l} />
			<use in:fly={{ y: 30, delay: 400 }} href={LOGO_SYMBOLS_HREFS.e} />
			<use in:fly={{ y: 30, delay: 450 }} href={LOGO_SYMBOLS_HREFS.x} />
		{/if}
	</svg>
	<button on:click={consult} class={ICON_CLASSES.HOVER}>
		<div class="arrow">
			<Icon name="arrow-down" strokeWidth="3" />
		</div>
	</button>
</header>

<style lang="scss">
	header {
		--radius: min(var(--ui-radius-xl), calc(var(--ui-scroll-px) * 0.2));
		position: relative;
		height: 100vh;
		width: 100%;
		background: col(bg, 100);
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: calc(-1 * var(--ui-nav-px));
		transition: border-radius 0.15s ease-out;
	}

	svg {
		cursor: pointer;
		width: 250px;
		fill: col(fg, 100);
	}

	button {
		cursor: pointer;
		position: absolute;
		text-align: center;
		bottom: 0;
		padding-block: var(--ui-gutter);
		color: col(fg, 100);
		font-size: 3rem;
		width: 100%;

		&:hover {
			.arrow {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}

	.arrow {
		opacity: 0.15;
		transform: translateY(-0.25em);
		transition: all 0.35s var(--ui-ease-out);
	}
</style>
