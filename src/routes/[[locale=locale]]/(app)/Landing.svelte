<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import { debounce } from '@melt-ui/svelte/internal/helpers';
	import { ArrowRight, Edit } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { spring, tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			welcome: 'Bienvenue sur Nplex!',
			sub: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi provident ratione aspernatur qui fuga dignissimos sed nesciunt, dolorum voluptas neque!',
			explore: 'Explorez les projets',
			start: 'Commencez à créer vos projets dès maintenant',
		},
		en: {
			welcome: 'Welcome to Nplex!',
			sub: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi provident ratione aspernatur qui fuga dignissimos sed nesciunt, dolorum voluptas neque!',
			explore: 'Explore projects',
			start: 'Start editing your own projects now',
		},
	});

	const factor = 0.1;
	const ax0 = 35;
	const ay0 = -15;
	const az0 = 35;
	let innerWidth = 0;
	let innerHeight = 0;
	let n = 0;
	$: nhalf = n / 2;
	const ncalc = debounce((...triggers) => {
		n = Math.round(Math.max(innerWidth, innerHeight) / 75);
	}, 500);
	$: ncalc(innerHeight, innerWidth);
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
	bind:innerHeight
	bind:innerWidth
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
	<grid>
		<surface>
			{#each { length: n } as row, irow}
				{#each { length: n } as col, icol}
					<cell
						style:--d="{Math.round(Math.random() * 1000)}ms"
						style:--row={irow}
						style:--col={icol}
					/>
				{/each}
			{/each}
		</surface>
	</grid>
	{#if mounted}
		<header>
			<h1 class="h1" in:fly={{ y: '0.25em', duration: 1000, delay: 250, easing: expoOut }}>
				{$t.welcome}
			</h1>
			<p in:fly={{ y: '0.25em', duration: 1000, delay: 350, easing: expoOut }}>{$t.sub}</p>
			<div>
				<button
					in:fly={{ y: '-0.25em', duration: 750, delay: 500, easing: expoOut }}
					class="button big cta"
				>
					{$t.explore}<ArrowRight />
				</button>
				<button
					in:fly={{ y: '-0.25em', duration: 750, delay: 750, easing: expoOut }}
					class="button big dashed bg-blur"
				>
					{$t.start}<Edit />
				</button>
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
		position: fixed;
		display: grid;
		width: 125vmax;
		height: 125vmax;
		top: 50%;
		left: 50%;
		transform-origin: center;
		transform: translate(-50%, -50%) perspective(9999px) rotateX(var(--ax)) rotateY(var(--ay))
			rotateZ(var(--az));
		grid-template-columns: repeat(calc(2 * var(--n)), 1fr);
		grid-template-rows: repeat(calc(2 * var(--n)), 1fr);
	}

	surface {
		display: inherit;
		grid-template-columns: inherit;
		grid-template-rows: inherit;
		gap: inherit;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
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
		gap: 1rem;
		max-width: var(--width-md);
		text-align: center;

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
