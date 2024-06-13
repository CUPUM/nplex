<script lang="ts">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { Trash } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		imageForm,
		form: projectForm,
	}: { imageForm: PageData['imagesForms'][number] } & ExtendedSuperFormData<PageData['form']> =
		$props();

	const dialogForm = new DialogForm();
</script>

<div>
	{imageForm.id}
	<menu class="gap-menu-gutter nest flex flex-row">
		<button class="switch"><Trash />{m.del()}</button>
		<button class="button" data-danger><Trash />{m.del()}</button>
	</menu>
</div>
{#if dialogForm.open}
	<dialog class="dialog">Hello</dialog>
{/if}
