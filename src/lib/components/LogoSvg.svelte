<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type $$Props = {
		mono?: boolean;
		size?: string | number;
		className?: string;
		style?: string;
	} & Omit<SVGAttributes<SVGElement>, 'viewBox'>;

	export let size: $$Props['size'] = '1em';
	export let className: $$Props['className'] = '';
	export { className as class };
	export let style: $$Props['style'] = undefined;
	/**
	 * Single glyph logo (n)
	 */
	export let mono: $$Props['mono'] = false;

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
				d="M230 100C230 127.614 207.614 150 180 150C152.386 150 130 127.614 130 100C130 72.3858 152.386 50 180 50C207.614 50 230 72.3858 230 100Z"
				fill="currentColor"
			/>
		</g>
		<path id="logo-l" d="M250 0H300V150H250V0Z" fill="currentColor" />
		<path
			id="logo-e"
			d="M320 100C320 72.3858 342.386 50 370 50C397.614 50 420 72.3858 420 100H370V150C342.386 150 320 127.614 320 100Z"
			fill="currentColor"
		/>
		<g id="logo-x">
			<path id="logo-x-top" d="M530 100L480 100L480 50L530 50L530 100Z" fill="currentColor" />
			<path id="logo-x-bottom" d="M480 150L430 150L430 100L480 100L480 150Z" fill="currentColor" />
		</g>
	{/if}
</svg>

<style lang="scss">
	svg {
		position: relative;
	}
</style>
