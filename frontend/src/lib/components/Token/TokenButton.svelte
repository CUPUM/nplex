<!--
	@component
	# Token Button
	
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import Ripple from '$components/Ripple.svelte';

	export let as: keyof HTMLElementTagNameMap = 'button';
	export let variant: 'default' | 'outlined' | 'danger' | 'cta' | 'ghost' = 'default';
	export let equi: boolean = true;
</script>

<svelte:element this={as} class="ui-token-button {variant}" class:equi type="button">
	<Ripple />
	<slot />
</svelte:element>

<style lang="scss">
	.ui-token-button {
		position: relative;
		cursor: pointer;
		height: calc(var(--height) - 2 * var(--inset));
		border-radius: calc(var(--radius) - var(--inset));
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5em;
	}

	.equi {
		width: calc(var(--height) - 2 * var(--inset));
		padding: 0;
	}

	.default {
		background: col(fg, 100, 0.1);

		&:hover {
			color: col(bg, 100);
			background: col(fg, 000);
		}
	}
</style>
