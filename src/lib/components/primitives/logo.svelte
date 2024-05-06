<script lang="ts">
	import { spin } from '$lib/motion/spin';
	import { onMount } from 'svelte';
	import { circOut, cubicOut, expoOut } from 'svelte/easing';
	import type { SVGAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { cn } from '../utilities';

	let {
		mono,
		height = '1em',
		class: className,
		...svgProps
	}: {
		mono?: boolean;
	} & Omit<SVGAttributes<SVGElement>, 'viewBox' | 'fill' | 'xmlns'> = $props();

	let mounted = $state(false);
	let viewBox = $derived(mono ? '0 50 100 100' : '0 0 520 200');

	onMount(() => {
		mounted = true;
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	{viewBox}
	{height}
	{...svgProps}
	class={cn('relative', className)}
>
	{#if mounted}
		<path
			in:fly|global={{ x: 60, duration: 500, opacity: 1 }}
			class="logo-n"
			d="M0 100C0 72.3858 22.3858 50 50 50C77.6142 50 100 72.3858 100 100V150H0V100Z"
			fill="currentColor"
		/>
		{#if !mono}
			<g class="logo-p">
				<circle
					in:fly|global={{ x: -60, duration: 750, opacity: 1 }}
					class="logo-p-eye origin-[0px_100px]"
					cx="170"
					cy="100"
					r="50"
					fill="currentColor"
				/>
				<path
					in:fly|global={{ y: -25, duration: 1000, opacity: 1 }}
					class="logo-p-descendant"
					d="M120 150H170V200H120V150Z"
					fill="currentColor"
				/>
			</g>
			<path
				in:spin|global={{ x: 90, opacity: 1, duration: 1000, easing: cubicOut }}
				class="logo-l origin-[0px_150px]"
				d="M240 0H290V150H240V0Z"
				fill="currentColor"
			/>
			<path
				in:spin|global={{ z: -90, duration: 1250, opacity: 1, easing: circOut }}
				class="logo-e relative origin-[350px_100px]"
				d="M405 100C405 72.3858 382.614 50 355 50C327.386 50 305 72.3858 305 100C305 127.614 327.386 150 355 150V100H405Z"
				fill="currentColor"
			/>
			<!-- <circle r="10" fill="red" cx="350" cy="100" /> -->
			<g class="logo-x">
				<path
					in:fly|global={{ x: -25, duration: 1500, easing: expoOut, opacity: 1 }}
					class="logo-x-top"
					d="M520 100L470 100L470 50L520 50L520 100Z"
					fill="currentColor"
				/>
				<path
					in:fly|global={{ x: 25, duration: 1750, easing: expoOut, opacity: 1 }}
					class="logo-x-bottop"
					d="M470 150L420 150L420 100L470 100L470 150Z"
					fill="currentColor"
				/>
			</g>
		{/if}
	{/if}
</svg>
