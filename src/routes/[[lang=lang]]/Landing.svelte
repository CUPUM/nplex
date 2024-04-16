<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import ButtonIconArrowRight from '$lib/components/ButtonIconArrowRight.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { link } from '$lib/i18n/link.svelte';
	import { debounce } from '@melt-ui/svelte/internal/helpers';
	import { Edit } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { spring, tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import LandingImage from './LandingImage.svelte';

	export let images: PageData['randomImages'];

	function randomArea(i: number) {
		const cspan = Math.round(Math.random() * 4 + 2) * 2;
		const rspan = Math.round(Math.random() * 4 + 2) * 2;
		const col = `${i ? 'auto' : Math.round((Math.random() * n) / 2) * 2} / span ${cspan}`;
		const row = `${i ? 'auto' : Math.round((Math.random() * n) / 2) * 2} / span ${rspan}`;
		return {
			col,
			row,
		};
	}

	const factor = 0.05;
	const ax0 = 35;
	const ay0 = -15;
	const az0 = 35;
	let clientWidth = 0;
	let clientHeight = 0;
	let n = 0;
	const ncalc = debounce((...triggers) => {
		n = Math.round(Math.max(clientWidth, clientHeight) / 100);
	}, 1000);
	$: ncalc(clientHeight, clientWidth);
	let y = tweened(0);
	const a = spring({ x: ax0, y: ay0, z: az0 });
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window
	on:scroll={() => {
		y.set(window.scrollY);
		a.set({
			x: Math.max(0, ax0 + window.scrollY * factor),
			y: Math.min(0, ay0 + window.scrollY * factor),
			z: Math.max(0, az0 - window.scrollY * factor),
		});
	}}
/>

<section
	id="landing"
	style:--n={n}
	style:--ax="{$a.x}deg"
	style:--ay="{$a.y}deg"
	style:--az="{$a.z}deg"
>
	<grid bind:clientWidth bind:clientHeight>
		{#await images.then( (resolvedImages) => (n ? resolvedImages.map( (image, i) => ({ ...image, ...randomArea(i) }) ) : []) ) then placedImages}
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
				>
					<LandingImage {image} {i} />
				</figure>
			{/each}
		{/await}
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
					{...$link($page.data.user ? '/edit/projects' : '/login')}
					in:fly={{ y: '-0.25em', duration: 750, delay: 500, easing: expoOut }}
					class="button big dashed bg-blur"
				>
					<LangKey>{m.landing_create()}</LangKey><Edit />
				</a>
				<a
					{...$link('/projects')}
					in:fly={{ y: '-0.25em', duration: 750, delay: 750, easing: expoOut }}
					class="button big cta"
				>
					<LangKey>{m.landing_explore()}</LangKey><ButtonIconArrowRight />
				</a>
			</div>
		</header>
	{/if}
</section>

<style>
</style>
