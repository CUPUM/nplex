<script lang="ts">
	import * as m from '$i18n/messages';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import DialogBox from '$lib/components/primitives/dialog-box.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { MODES } from '$lib/modes/constants';
	import { imageSrc } from '$lib/storage/media/url';
	import { Check, Trash, Wallpaper, Wrench } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		imageForm,
		form: projectForm,
	}: { imageForm: PageData['imagesForms'][number] } & ExtendedSuperFormData<PageData['form']> =
		$props();

	let submitRef = $state<HTMLButtonElement>();

	const { form, enhance, submitter } = extendedSuperForm(imageForm);

	const dialog = new Dialog();
</script>

<figure
	class="bg-primary pt-md group/card relative flex aspect-square flex-col-reverse rounded-sm"
	data-mode={MODES.DARK}
>
	<img
		src={imageSrc($form.storageName, { resize: { fit: 'inside', height: 250 }, quality: 0.8 })}
		alt="image-{$form.id}"
		class="rounded-inherit absolute top-0 left-0 h-full w-full object-cover"
	/>
	<menu
		class="rounded-b-inherit after:rounded-inherit p-input-padding gap-menu-gutter after:content after:from-popover/90 after:duration-medium relative z-1 flex min-h-[50%] flex-row flex-wrap content-end text-sm transition-all after:pointer-events-none after:absolute after:inset-0 after:-z-1 after:bg-gradient-to-t after:to-transparent after:opacity-0 after:transition-all group-hover/card:after:opacity-100"
	>
		<button class="button pointer-events-auto backdrop-blur-md" {...dialog.triggerAttributes}>
			<Wrench />
			{m.edit()}
		</button>
		<button
			class="button backdrop-blur-md"
			form={imageForm.id}
			formaction="?/{$form.isBanner ? 'demote' : 'promote'}"
		>
			<Wallpaper />{m.project_image_set_banner()}
		</button>
		<button
			class="button button-ghost aspect-square backdrop-blur-md"
			data-danger
			type="submit"
			form={imageForm.id}
			formaction="?/delete"
		>
			<Trash />
		</button>
	</menu>
</figure>

<DialogBox {dialog}>
	{#snippet title()}
		Image
	{/snippet}
	Hello
	{#snippet actions()}
		<button bind:this={submitRef} class="button button-cta">
			<IconSpinner icon={Check} busy={submitRef === $submitter} />{m.save()}
		</button>
	{/snippet}
</DialogBox>
