<script lang="ts">
	import { intersection } from '$actions/intersection';
	import { LOGO_SYMBOLS, LOGO_VIEWBOX } from '$components/Logo2.svelte';
	import { THEME_CLASSES, THEME_NAMES } from '$utils/themes';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { navbarTheme } from './Navbar.svelte';

	let entered = false;

	function enter() {
		entered = true;
		navbarTheme.set(THEME_NAMES.DARK);
	}

	function leave() {
		entered = false;
		navbarTheme.reset();
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
	<svg viewBox={LOGO_VIEWBOX}>
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
</header>

<style lang="scss">
	header {
		--radius: min(var(--ui-radius-xl), calc(var(--ui-scroll-px) * 0.2));
		height: 100vh;
		width: 100%;
		margin-top: calc(-1 * var(--ui-nav-px));
		background: col(bg, 100);
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
		transition: all 0.15s var(--ui-ease-out);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		width: 250px;
	}

	g {
		fill: col(fg, 100);
	}
</style>
