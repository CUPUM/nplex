<script lang="ts">
	import type { Dialog } from '$lib/builders/dialog.svelte';
	import { Pencil } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { ripple } from '../primitives/ripple.svelte';

	let { children, dialog }: { children: Snippet; dialog: Dialog } = $props();
</script>

<div class="button nest has-[button:last-child]:pr-input-nest rounded-full" use:ripple>
	<button class="fill peer/trigger" type="button" {...dialog.triggerAttributes}></button>
	<Pencil class="peer-hover/trigger:animate-wiggle" />
	{@render children()}
</div>
