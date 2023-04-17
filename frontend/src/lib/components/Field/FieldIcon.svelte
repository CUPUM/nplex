<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from '../Icon.svelte';

	type $$Props = ComponentProps<Icon>;

	export let name: $$Props['name'];
	export let style: string | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };
</script>

<i class="field-icon {className}" {style}>
	<Icon {name} {...$$restProps} />
</i>

<style lang="scss">
	.field-icon {
		--gap: 0.2em;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		opacity: 0.5;
		padding-inline: var(--ui-pad-sm);
		align-self: stretch;
		transition: all 0.1s ease;
		// :global(.leading) > &:last-child {
		// 	padding-right: 0;
		// }
		// :global(.leading) > &:not(:first-child) {
		// 	padding-left: var(--gap);
		// }
		// :global(.trailing) > &:first-child {
		// 	padding-left: 0;
		// }
		// :global(.trailing) > &:not(:last-child) {
		// 	padding-right: var(--gap);
		// }
		:global(.focused) & {
			opacity: 1;
		}
	}
</style>
