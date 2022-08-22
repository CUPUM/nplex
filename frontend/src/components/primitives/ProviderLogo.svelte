<script lang="ts">
	import { cssSize, type SizeInput } from '$utils/css';
	import { providers } from '$utils/values/providers';

	export let name: keyof typeof providers;
	export let size: SizeInput = '1em';
</script>

<svg style:--size={cssSize(size)} preserveAspectRatio="xMidYMid">
	{@html providers[name].svg}
</svg>

<style lang="scss">
	svg {
		position: relative;
		width: var(--size);
		height: var(--size);
		background-color: transparent;
		margin: 0;
		padding: 0;
		display: inline-block;
		top: 0.1em;

		& :global(svg) {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
