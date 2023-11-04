<script lang="ts">
	import { createTooltip } from '$lib/builders/tooltip';
	import type { FloatingConfig } from '@melt-ui/svelte/internal/actions';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import type { Writable } from 'svelte/store';
	import TooltipContent from './TooltipContent.svelte';

	export let positioning: FloatingConfig | undefined = undefined;
	export let arrowSize: number | undefined = undefined;
	export let defaultOpen: boolean | undefined = undefined;
	export let open: Writable<boolean> | undefined = undefined;
	export let onOpenChange: ChangeFn<boolean> | undefined = undefined;
	export let closeOnPointerDown: boolean | undefined = true;
	export let openDelay: number | undefined = undefined;
	export let closeDelay: number | undefined = undefined;
	export let forceVisible: boolean | undefined = undefined;
	export let closeOnEscape: boolean | undefined = undefined;
	export let disableHoverableContent: boolean | undefined = true;
	/**
	 * If set to `true`, whenever you open this tooltip, all other tooltips with `group` also set to
	 * `true` will close. If you pass in a string instead, only tooltips with the same `group` value
	 * will be closed.
	 */
	export let group: boolean | string | undefined = undefined;
	/**
	 * If not undefined, the tooltip will be rendered within the provided element or selector.
	 *
	 * @default 'body'
	 */
	export let portal: HTMLElement | string | null | undefined = undefined;

	const {
		elements: { trigger, content, arrow },
		states,
		options,
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
		disableHoverableContent,
		group,
		portal,
	});
</script>

<slot trigger={$trigger} />
{#if $$slots.content}
	<TooltipContent {content} {...options} {...states} arrow={$arrow}>
		<slot name="content" />
	</TooltipContent>
{/if}

<style lang="postcss">
</style>
