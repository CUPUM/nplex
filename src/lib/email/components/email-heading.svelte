<script context="module" lang="ts">
	const STYLES = {
		BASE: 'font-weight:bold;',
		LEVELS: {
			'1': '',
			'2': '',
			'3': '',
			'4': '',
			'5': '',
			'6': '',
		},
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		level,
		...headingProps
	}: { level: keyof (typeof STYLES)['LEVELS'] } & HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<svelte:element this={`h${level}`} {...headingProps} style="{STYLES.BASE} {STYLES.LEVELS[level]}">
	{@render children?.()}
</svelte:element>

<style>
</style>
