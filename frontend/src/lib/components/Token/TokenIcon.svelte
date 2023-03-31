<script lang="ts">
	import Icon from '$components/Icon.svelte';

	import type { ComponentProps } from 'svelte';

	type $$Props = ComponentProps<Icon>;

	export let name: $$Props['name'];
</script>

<i class="token-icon">
	<Icon {name} {...$$restProps} />
</i>

<style lang="scss">
	.token-icon {
		display: inline-flex;
		position: relative;
		padding-inline: 0.25em;
		top: -0.1em;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		:global(.token-main) & {
			top: 0.1em;
		}
	}
</style>
