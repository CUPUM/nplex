<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from '../Icon.svelte';

	type $$Props = ComponentProps<Icon>;

	$: typedProps = $$props as $$Props;
</script>

<i class="field-icon {typedProps.class || ''}">
	<Icon {...typedProps} />
</i>

<style lang="scss">
	.field-icon {
		--gap: 0.2em;
		position: relative;
		display: inline-block;
		line-height: 1;
		padding-bottom: calc(0.5em - 0.5ex);
		opacity: 0.5;
		padding-inline: var(--ui-pad-x);
		transition: all 0.25s;
		:global(.leading) > &:last-child {
			padding-right: 0;
		}
		:global(.leading) > &:not(:first-child) {
			padding-left: var(--gap);
		}
		:global(.trailing) > &:first-child {
			padding-left: 0;
		}
		:global(.trailing) > &:not(:last-child) {
			padding-right: var(--gap);
		}
		:global(.focused) & {
			opacity: 1;
		}
	}
</style>
