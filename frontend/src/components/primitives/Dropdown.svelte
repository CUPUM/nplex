<script lang="ts">
	import { clickoutside } from '$actions/clickoutside/clickoutside';

	export let active: boolean = false;
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
</script>

<div class="container" use:clickoutside on:clickoutside={() => (active = false)}>
	<slot name="trigger" />
	{#if active}
		<div class="placer">
			<div class="dropdown" {...$$restProps}>
				<slot />
			</div>
		</div>
	{/if}
</div>

<style>
	.placer {
		z-index: 100;
		position: relative;
		width: 0;
		height: 0;
		padding: 0;
		margin: 0;
	}

	.dropdown {
		position: absolute;
		background-color: var(--color-light-100);
		padding: 1em;
		border-radius: 1em;
	}
</style>
