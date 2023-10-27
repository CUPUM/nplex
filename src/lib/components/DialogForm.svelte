<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';

	type TBase = ZodValidation<AnyZodObject>;
</script>

<script lang="ts" generics="T extends TBase, M extends App.PageData['flash']">
	import type { SuperFormDialog } from '$lib/forms/client';
	import type { DialogElements, DialogStates } from '@melt-ui/svelte';
	import type { ZodValidation } from 'sveltekit-superforms';
	import Dialog from './Dialog.svelte';

	export let portalled: DialogElements['portalled'];
	export let close: DialogElements['close'];
	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	export let description: DialogElements['description'];
	export let open: DialogStates['open'];
	export let reset: SuperFormDialog<T, M>['reset'];

	function test() {
		reset();
	}
</script>

<Dialog {portalled} {close} {overlay} {content} {title} {description} {open}>
	<!-- <svelte:fragment slot="header"></svelte:fragment> -->
</Dialog>

<style lang="postcss">
</style>
