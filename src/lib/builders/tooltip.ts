import { createTooltip as ct, type CreateTooltipProps } from '@melt-ui/svelte';

export const TOOLTIP_GROUPS = {
	ROOT: 'root',
} as const;

export function createTooltip(props?: CreateTooltipProps) {
	const { positioning, ...tooltipProps } = props ?? {};
	return ct({
		positioning: {
			placement: 'top',
			gutter: 10,
			...positioning,
		},
		// group: TOOLTIP_GROUPS.ROOT,
		forceVisible: true,
		openDelay: 150,
		closeDelay: 0,
		closeOnPointerDown: true,
		...tooltipProps,
	});
}
