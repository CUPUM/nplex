<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type $$Props = {
		mono?: boolean;
		size?: string | number;
		className?: string;
		style?: string;
	} & Omit<SVGAttributes<SVGElement>, 'viewBox'>;

	/**
	 * Single glyph logo (n)
	 */
	export let mono: $$Props['mono'] = false;
	export let size: $$Props['size'] = '1em';
	export let className: $$Props['className'] = '';
	export { className as class };
	export let style: $$Props['style'] = undefined;

	$: viewBox = mono ? '0 50 100 100' : '0 0 520 200';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	height={size}
	fill="none"
	{...$$restProps}
	class={className}
	{style}
>
	<path
		id="logo-n"
		d="M0 100C0 72.3858 22.3858 50 50 50C77.6142 50 100 72.3858 100 100V150H0V100Z"
		fill="currentColor"
	/>
	{#if !mono}
		<g id="logo-p">
			<path id="logo-p-descendant" d="M120 150H170V200H120V150Z" fill="currentColor" />
			<path
				id="logo-p-eye"
				d="M220 100C220 127.614 197.614 150 170 150C142.386 150 120 127.614 120 100C120 72.3858 142.386 50 170 50C197.614 50 220 72.3858 220 100Z"
				fill="currentColor"
			/>
		</g>
		<path id="logo-l" d="M240 0H290V150H240V0Z" fill="currentColor" />
		<path
			id="logo-e"
			d="M310 100C310 72.3858 332.386 50 360 50C387.614 50 410 72.3858 410 100H360V150C332.386 150 310 127.614 310 100Z"
			fill="currentColor"
		/>
		<g id="logo-x">
			<path id="logo-x-top" d="M520 100L470 100L470 50L520 50L520 100Z" fill="currentColor" />
			<path id="logo-x-bottom" d="M470 150L420 150L420 100L470 100L470 150Z" fill="currentColor" />
		</g>
	{/if}
</svg>

<style lang="scss">
	svg {
		position: relative;
	}
</style>
