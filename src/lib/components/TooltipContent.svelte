<script lang="ts">
	import { getDistances, getTransformOrigin } from '$lib/utils/positioning';
	import {
		melt,
		type TooltipElements,
		type TooltipOptions,
		type TooltipStates,
	} from '@melt-ui/svelte';
	import { css } from 'styled-system/css';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import Tip from './Tip.svelte';

	export let open: TooltipStates['open'];
	export let content: TooltipElements['content'];
	export let positioning: TooltipOptions['positioning'];
</script>

{#if $open}
	<div
		class={css({
			'--tip-color': 'colors.neutral.100/.95',
			'fontWeight': '400',
			'fontSize': 'x-small',
			'letterSpacing': '0.02em',
			'padding': '0.75rem',
			'borderRadius': 'sm',
			'boxShadow': 'lg',
			'color': 'neutral.200',
			'backgroundColor': 'var(--tip-color)',
			'backdropFilter': 'blur(8px)',
			'_dark': {
				'--tip-color': 'colors.neutral.950/.95',
				'color': 'neutral.300',
			},
		})}
		use:melt={$content}
		style:transform-origin={getTransformOrigin($positioning)}
		in:fly={{ ...getDistances($positioning, -4), easing: cubicOut, duration: 100 }}
		out:scale={{ start: 0.8, duration: 100 }}
	>
		<Tip {positioning} />
		<slot />
	</div>
{/if}
