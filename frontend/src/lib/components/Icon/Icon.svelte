<script lang="ts">
	import { transform } from '$transitions/transform';
	import { cssSize } from '$utils/styles';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { draw, fade } from 'svelte/transition';
	import * as styles from './Icon.css';
	import { icons } from './icons';

	export let name: keyof typeof icons;
	export let secondaryColor: string = 'currentColor';
	export let thickness: number | string = 1.5;
	export let scaleStroke: boolean = false;
	export let style: string = '';
	let className: string | undefined = undefined;
	export { className as class };

	let ref: HTMLElement;

	$: icon = icons[name];
</script>

<i bind:this={ref} aria-roledescription="icon-{name}" {style} class="{styles.icon} {className}">
	{#key name}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
			viewBox={icon.viewBox}
			style:--secondary-color={secondaryColor}
			style:--thickness={cssSize(thickness)}
			class={styles.svg}
			in:transform|local={{
				scale: 0.5,
				rotateZ: 20,
				duration: 200,
				delay: 50,
				easing: cubicOut,
			}}
			out:transform|local={{ scale: 0.75, rotateZ: -20, duration: 150, easing: cubicIn }}
		>
			{#each icon.paths as path, i}
				{#if path.fill}
					<path
						in:fade={{ delay: i * 250, duration: 400 }}
						class="fill {styles.path}"
						class:secondary={path.type === 'secondary'}
						d={path.d}
					/>
				{/if}
				{#if path.stroke}
					<path
						in:draw={{ delay: i * 250, duration: 400 }}
						class="stroke {styles.path}"
						class:secondary={path.type === 'secondary'}
						vector-effect={scaleStroke ? undefined : 'non-scaling-stroke'}
						d={path.d}
					/>
				{/if}
			{/each}
		</svg>
	{/key}
</i>
