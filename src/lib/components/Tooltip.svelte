<script lang="ts">
	import { createTooltip, melt, type CreateTooltipProps } from '@melt-ui/svelte';

	export let positioning: CreateTooltipProps['positioning'] = undefined;
	export let arrowSize: CreateTooltipProps['arrowSize'] = undefined;
	export let defaultOpen: CreateTooltipProps['defaultOpen'] = undefined;
	export let open: CreateTooltipProps['open'] = undefined;
	export let onOpenChange: CreateTooltipProps['onOpenChange'] = undefined;
	export let closeOnPointerDown: CreateTooltipProps['closeOnPointerDown'] = undefined;
	export let openDelay: CreateTooltipProps['openDelay'] = undefined;
	export let closeDelay: CreateTooltipProps['closeDelay'] = undefined;
	export let forceVisible: CreateTooltipProps['forceVisible'] = undefined;
	export let closeOnEscape: CreateTooltipProps['closeOnEscape'] = undefined;
	export let portal: CreateTooltipProps['portal'] = undefined;
	let _content: string | undefined = undefined;
	export { _content as content };

	const {
		elements: { trigger, content, arrow },
		states: { open: _open },
	} = createTooltip({
		positioning,
		arrowSize,
		defaultOpen,
		open,
		onOpenChange,
		closeOnPointerDown,
		openDelay,
		closeDelay,
		forceVisible,
		closeOnEscape,
		portal,
	});
</script>

<slot />
{#if $_open}
	<div class="container" use:melt={$content}>
		<div class="content" use:melt={$arrow} />
		<slot name="content">
			{_content}
		</slot>
	</div>
{/if}

<style lang="scss">
	.container {
	}

	.content {
	}
</style>
