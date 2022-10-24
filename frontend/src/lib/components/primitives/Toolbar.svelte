<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { SizeInput } from '$utils/css';

	export let direction: 'row' | 'column' = 'row';
	export let size: SizeInput = '1em';
</script>

<menu style:flex-direction={direction} style:font-size={size}>
	<slot />
</menu>

<style lang="scss">
	menu {
		--outset: 3px;
		display: flex;
		gap: 0;
		padding: var(--outset);
		background-color: rgba(255, 255, 255, 9);
		backdrop-filter: blur(8px);
		transition: all 0.2s ease-out;

		&:hover {
			background-color: rgba(255, 255, 255, 1);
			box-shadow: 0 1em 3em -2em rgba(var(--rgb-dark-900), 0.2);
		}
	}
</style>
