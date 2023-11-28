<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { link } from '$lib/i18n/link';
	import { transform } from '$lib/transitions/transform';
	import { debounce } from '@melt-ui/svelte/internal/helpers';
	import { ArrowRight, Edit } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { spring, tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let images: PageData['randomImages'];

	function randomArea(...triggers: unknown[]) {
		const cspan = Math.round(Math.random() * 7 + 3);
		const rspan = Math.round(Math.random() * 7 + 3);
		const col = `${Math.round(Math.random() * (n - cspan))} / span ${cspan}`;
		const row = `${Math.round(Math.random() * (n - rspan))} / span ${rspan}`;
		return {
			col,
			row,
		};
	}

	$: placedImages = n ? images.map((image) => ({ ...image, ...randomArea() })) : [];
	$: console.log(placedImages);

	const factor = 0.1;
	const ax0 = 35;
	const ay0 = -15;
	const az0 = 35;
	let clientWidth = 0;
	let clientHeight = 0;
	let n = 0;
	const ncalc = debounce((...triggers) => {
		n = Math.round(Math.max(clientWidth, clientHeight) / 75);
	}, 500);
	$: ncalc(clientHeight, clientWidth);
	let y = tweened(0);
	let ax = spring(ax0);
	let ay = spring(ay0);
	let az = spring(az0);
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window
	on:scroll={() => {
		y.set(window.scrollY);
		ax.set(Math.max(0, ax0 - window.scrollY * factor));
		ay.set(Math.min(0, ay0 + window.scrollY * factor));
		az.set(Math.max(0, az0 - window.scrollY * factor));
	}}
/>

<section
	id="landing"
	style:--n={n}
	style:--ax="{$ax}deg"
	style:--ay="{$ay}deg"
	style:--az="{$az}deg"
>
	<grid bind:clientWidth bind:clientHeight>
		{#each placedImages as image, i (image.id)}
			<figure
				style:grid-column={image.col}
				style:grid-row={image.row}
				animate:flip={{
					duration(len) {
						return len / 2 + 350;
					},
					easing: expoInOut,
				}}
				in:transform={{
					translate: [0, 0, -50],
					opacity: 0,
					duration: 2000,
					easing: expoOut,
					delay: i * Math.random() * 350,
				}}
			>
				<img />
			</figure>
		{/each}
		<surface>
			{#each { length: n } as row, irow}
				{#each { length: n } as col, icol}
					<cell
						style:--d="{Math.round(Math.random() * 2000)}ms"
						style:--row={irow}
						style:--col={icol}
					/>
				{/each}
			{/each}
		</surface>
	</grid>
	{#if mounted}
		<header>
			<hgroup in:fly={{ y: 8, duration: 1000, delay: 250, easing: expoOut }}>
				<Logo />
			</hgroup>
			<!-- <LangKey>
				<h1 class="h1" in:fly={{ y: '0.25em', duration: 1000, delay: 250, easing: expoOut }}>
					{m.landing_title()}
				</h1>
			</LangKey>
			<LangKey>
				<p in:fly={{ y: '0.25em', duration: 1000, delay: 350, easing: expoOut }}>
					{m.landing_sub()}
				</p>
			</LangKey> -->
			<div>
				<a
					{...$link('/projects')}
					in:fly={{ y: '-0.25em', duration: 750, delay: 500, easing: expoOut }}
					class="button big cta"
				>
					<LangKey>{m.landing_explore()}</LangKey><ArrowRight />
				</a>
				<a
					{...$link($page.data.user ? '/edit/projects' : '/login')}
					in:fly={{ y: '-0.25em', duration: 750, delay: 750, easing: expoOut }}
					class="button big dashed bg-blur"
				>
					<LangKey>{m.landing_create()}</LangKey><Edit />
				</a>
			</div>
		</header>
	{/if}
</section>

<style lang="postcss">
	#landing {
		margin-top: calc(-1 * var(--navbar-height));
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		position: relative;
		overflow: hidden;
		border-radius: 0 0 var(--radius-3xl) var(--radius-3xl);
	}

	grid {
		z-index: -1;
		position: absolute;
		display: grid;
		width: 150vmax;
		height: 150vmax;
		top: 50%;
		left: 50%;
		transform-origin: center;
		transform: translate(-50%, -50%) perspective(9999px) rotateX(var(--ax)) rotateY(var(--ay))
			rotateZ(var(--az));
		grid-template-columns: repeat(calc(2 * var(--n)), 1fr);
		grid-template-rows: repeat(calc(2 * var(--n)), 1fr);
		transform-style: preserve-3d;
	}

	figure {
		z-index: 1;
		/* box-shadow: 1.5em 2.5em 4em -1.5em var(--base-bg); */
		position: relative;
		opacity: 0.5;
		background: var(--color-neutral-500);
		border-radius: var(--radius-md);
	}

	surface {
		display: inherit;
		grid-template-columns: inherit;
		grid-template-rows: inherit;
		gap: inherit;
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	@keyframes fade {
		from {
			opacity: 0;
			transform: scale(0);
		}
		to {
			opacity: calc(var(--row) / (2 * var(--n)) + var(--col) / (2 * var(--n)));
			transform: scale(1);
		}
	}

	cell {
		--pattern-size: 0.5rem;
		--pattern-thickness: var(--base-border-width);
		grid-column: span 2;
		grid-row: span 2;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		aspect-ratio: 1;
		opacity: 0;
		animation: fade 1500ms var(--d) ease-out forwards;
		color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		background-image: linear-gradient(transparent 49%, currentColor 50%, transparent 51%),
			linear-gradient(90deg, transparent 49%, currentColor 50%, transparent 51%);

		&::before,
		&::after {
			content: '';
			position: absolute;
			background: var(--color-neutral-500);
		}

		&::before {
			width: var(--pattern-thickness);
			height: var(--pattern-size);
		}

		&::after {
			height: var(--pattern-thickness);
			width: var(--pattern-size);
		}
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		max-width: var(--width-md);
		text-align: center;

		hgroup {
			font-size: 10rem;
			color: var(--color-neutral-900);
			:global(:--dark) & {
				color: var(--color-neutral-200);
			}
		}

		p {
			opacity: 0.75;
			font-size: var(--size-lg);
			margin-block: 1rem;
			line-height: var(--line-sparse);
		}

		div {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: var(--base-gutter);

			.button {
				box-shadow: 0 1.5em 4em -2em rgba(0, 0, 0, 0.25);
			}
		}
	}
</style>
