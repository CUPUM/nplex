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
		trigger: Snippet<[ReturnType<Dialog['triggerAttributes']>]>;
		content: Snippet;
		modal?: boolean;
		onClickoutside: (e: MouseEvent) => void;
		closeOnClickoutside?: boolean;
	} & HTMLDialogAttributes = $props();

	const dialog = new Dialog();
</script>

{@render trigger(dialog.triggerAttributes())}
{#if open}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<dialog use:dialog.dialogAction {...dialog.dialogAttributes()}>
		<div class="content" {...dialog.contentAttributes()}>
			{@render content()}
		</div>
	</dialog>
{/if}

<style>
	dialog {
		padding: 1rem;
	}

	.content {
		padding: 2rem;
		background: grey;
	}
</style>
