<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		...props
	}: {
		align?: 'center' | 'left' | 'right';
		id?: string;
		style?: string;
		children?: Snippet;
	} = $props();
</script>

<p {...props} style="">
	{@render children?.()}
</p>
