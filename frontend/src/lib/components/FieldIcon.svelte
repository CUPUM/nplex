<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from './Icon.svelte';

	type $$Props = ComponentProps<Icon>;

	$: typedProps = $$props as $$Props;
</script>

<div class="field-icon">
	<Icon scaleStroke={false} thickness="1.5" {...typedProps} />
</div>

<style lang="scss">
	.field-icon {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.5;
		min-height: 1em;
		padding-inline: var(--padding-inline); // See Field component for ref.
		transition: all 0.25s;
		:global(.leading) > &:last-child {
			padding-right: 0;
		}
		:global(.trailing) > &:first-child {
			padding-left: 0;
		}
		:global(.focused) & {
			opacity: 1;
		}
	}
</style>
