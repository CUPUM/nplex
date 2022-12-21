<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { browser } from '$app/environment';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import { LOGO_SYMBOLS, LOGO_VIEWBOX } from '$components/Logo2.svelte';
	import { THEME_CLASSES, THEME_NAMES } from '$utils/themes';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { navbarTheme } from './Navbar.svelte';

	export let scrollTarget: HTMLElement;

	let entered = false;

	function enter() {
		entered = true;
		navbarTheme.set(THEME_NAMES.DARK);
	}

	function leave() {
		entered = false;
		navbarTheme.reset();
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
		if (e.key === 'Enter' || e.key === 'ArrowDown') {
			consult();
		}
	}

	onDestroy(() => {
		leave();
	});
</script>

<header
	use:intersection={{ rootMargin: '-30px 0px 0px 0px' }}
	on:enter={enter}
	on:leave={leave}
	class={THEME_CLASSES.DARK}
>
	<svg viewBox={LOGO_VIEWBOX} on:click={consult} on:keydown={keydown}>
		<g>
			{#if entered}
				<use in:fly={{ y: 30, delay: 250 }} href={LOGO_SYMBOLS.n.href} />
				<use in:fly={{ y: 30, delay: 300 }} href={LOGO_SYMBOLS.p.href} />
				<use in:fly={{ y: 30, delay: 350 }} href={LOGO_SYMBOLS.l.href} />
				<use in:fly={{ y: 30, delay: 400 }} href={LOGO_SYMBOLS.e.href} />
				<use in:fly={{ y: 30, delay: 450 }} href={LOGO_SYMBOLS.x.href} />
			{/if}
		</g>
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
		margin-top: calc(-1 * var(--ui-nav-px));
		background: col(bg, 100);
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease-out;
	}

	svg {
		cursor: pointer;
		width: 250px;
	}

	g {
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
