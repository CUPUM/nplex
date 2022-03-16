<script lang="ts">
	import { ripple } from '$actions/ripple';

	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let interactive: boolean = true;
	export let active: boolean = false;
</script>

<div
	class={variant}
	class:interactive
	class:active
	style:font-size="var(--size-{size})"
	on:click
	on:focus
	{...$$restProps}
	use:ripple={{ disabled: !interactive }}
>
	<slot />
	<span />
</div>

<style lang="postcss">
	div {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-primary-300);
		line-height: 2em;
		text-overflow: ellipsis;
		max-width: 200px;
		height: 2em;
		border-radius: 1em;
		padding: 0 1em;
		vertical-align: middle;
		overflow: hidden;
	}

	span {
		position: relative;
	}

	.interactive {
		cursor: pointer;
	}
</style>
