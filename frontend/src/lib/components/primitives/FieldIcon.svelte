<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from './Icon.svelte';

	type IconProps = ComponentProps<Icon>;

	export let name: IconProps['name'];
	export let size: IconProps['size'] = '1.5em';
	export let color: IconProps['color'] = 'currentColor';
	export let secondaryColor: IconProps['color'] = color;
	export let strokeWidth: IconProps['strokeWidth'] = 1.5;
	export let scaleStroke: IconProps['scaleStroke'] = true;
	export let strokeOpacity: IconProps['strokeOpacity'] = 1;
	export let fillOpacity: IconProps['fillOpacity'] = 1;
	export let intro: IconProps['intro'] = false;
</script>

<div>
	<Icon {name} {size} {color} {secondaryColor} {strokeWidth} {scaleStroke} {strokeOpacity} {fillOpacity} {intro} />
</div>

<style lang="scss">
	div {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1 / 1;
		padding-bottom: 0.2em;
		height: 100%;
		opacity: 0.5;
		top: -0.1em;
		transition: all 0.25s;
	}

	:global(.field.focused) div {
		opacity: 1;
	}
</style>
