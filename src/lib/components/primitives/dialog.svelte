<script lang="ts">
	import { Dialog } from '$lib/builders/dialog.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let {
		open = $bindable(false),
		trigger,
		content,
		modal,
		closeOnClickoutside = true,
		onClickoutside,
		...restProps
	}: {
		open?: boolean;
		trigger: Snippet<[InstanceType<typeof Dialog>['triggerAttributes']]>;
		content: Snippet;
		modal?: boolean;
		onClickoutside: (e: MouseEvent) => void;
		closeOnClickoutside?: boolean;
	} & HTMLDialogAttributes = $props();

	const dialog = new Dialog();
</script>

{@render trigger(dialog.triggerAttributes)}
{#if open}
	<dialog class="dialog" use:dialog.dialogAction {...dialog.dialogAttributes}>
		{@render content()}
	</dialog>
{/if}
