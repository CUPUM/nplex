<script lang="ts">
	import type { Dialog } from '$lib/builders/dialog.svelte';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { ripple } from '../primitives/ripple.svelte';

	let { children, dialog }: { children: Snippet; dialog: Dialog } = $props();
</script>

<button
	class="group/button button button-dashed rounded-full"
	use:ripple
	type="button"
	{...dialog.triggerAttributes}
>
	<Plus class="group-hover/button:animate-pulse" />
	{@render children()}
</button>
