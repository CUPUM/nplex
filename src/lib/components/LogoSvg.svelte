<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type $$Props = {
		mono?: boolean;
		size?: string | number;
	} & Omit<SVGAttributes<SVGElement>, 'viewBox'>;

	export let size: $$Props['size'] = '1em';
	/**
	 * Single glyph logo (n)
	 */
	export let mono: $$Props['mono'] = false;

	$: viewBox = mono ? '0 50 100 100' : '0 0 530 200';
	$: width = mono ? '100' : '530';
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox} height={size} fill="none" {...$$restProps}>
	<path
		id="logo-n"
		d="M0 100C0 72.3858 22.3858 50 50 50V50C77.6142 50 100 72.3858 100 100V150H0V100Z"
		fill="currentColor"
	/>
	{#if !mono}
		<g id="logo-p">
			<path
				id="logo-p-1"
				d="M220 100C220 127.614 197.614 150 170 150C142.386 150 120 127.614 120 100C120 72.3858 142.386 50 170 50C197.614 50 220 72.3858 220 100Z"
				fill="currentColor"
			/>
			<path id="logo-p-2" d="M120 150H170V200H120V150Z" fill="currentColor" />
		</g>
		<path id="logo-l" d="M240 0H290V150H240V0Z" fill="currentColor" />
		<path
			id="logo-e"
			d="M310 100C310 72.3858 332.386 50 360 50V50C387.614 50 410 72.3858 410 100V100H360V150V150C332.386 150 310 127.614 310 100V100Z"
			fill="currentColor"
		/>
		<g id="logo-x">
			<path id="logo-x-1" d="M430 100H480V150H430V100Z" fill="currentColor" />
			<path id="logo-x-2" d="M480 50H530V100H480V50Z" fill="currentColor" />
		</g>
	{/if}
</svg>

<style lang="scss">
	svg {
		position: relative;
	}
</style>
