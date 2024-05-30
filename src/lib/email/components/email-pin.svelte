<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		monospaced,
		centered,
		...props
	}: { monospaced?: boolean; centered?: boolean } & HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p {...props} style="">
	{@render children?.()}
</p>
