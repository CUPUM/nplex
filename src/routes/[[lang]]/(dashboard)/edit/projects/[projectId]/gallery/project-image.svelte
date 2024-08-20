<script lang="ts">
	import * as m from '$i18n/messages';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import DialogBox from '$lib/components/primitives/dialog-box.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { imageSrc } from '$lib/storage/media/url';
	import { THEMES } from '$lib/theme/constants';
	import { Check, Square, Trash, Wallpaper, Wrench } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		types,
		imageForm,
		form: galleryForm,
		formId: galleryFormId,
		submitter: gallerySubmitter,
	}: {
		imageForm: PageData['imageForms'][number];
	} & ExtendedSuperFormData<PageData['galleryForm']> &
		Pick<PageData, 'types'> = $props();

	let submitRef = $state<HTMLButtonElement>();
	let deleteRef = $state<HTMLButtonElement>();
	let bannerRef = $state<HTMLButtonElement>();

	const { form, enhance, submitter, formId } = extendedSuperForm(imageForm);

	const dialog = new Dialog();

	let isBanner = $derived($galleryForm.bannerId === $form.id);
</script>

<figure
	class="bg-card pt-md group/card absolute relative flex h-full w-full flex-col-reverse rounded-sm"
	data-theme={THEMES.DARK}
>
	<img
		src={imageSrc($form.storageName, { resize: { fit: 'inside', height: 250 }, quality: 0.8 })}
		alt="image-{$form.id}"
		class="rounded-inherit absolute top-0 left-0 h-full w-full object-cover"
	/>
	<button class="fill" {...dialog.triggerAttributes}></button>
	<div
		class="rounded-inherit after:rounded-inherit p-input-padding gap-gap after:content after:from-popover after:duration-medium pointer-events-none relative z-1 flex h-full flex-col transition-all after:pointer-events-none after:absolute after:inset-0 after:-z-1 after:bg-gradient-to-t after:to-transparent after:opacity-0 after:transition-all group-hover/card:after:opacity-100"
	>
		<header class="flex-1">
			{$form.id}
		</header>
		<menu
			class="gap-input-group-gap *:bg-overlay/75 flex flex-row flex-wrap items-start text-xs *:pointer-events-auto"
		>
			<button class="button button-ghost backdrop-blur-sm" {...dialog.triggerAttributes}>
				<Wrench />
				{m.edit()}
			</button>
			<button
				class="button button-ghost backdrop-blur-sm"
				data-danger
				type="submit"
				name="deleteId"
				value={$form.id}
				form={$galleryFormId}
				formaction="?/delete"
				bind:this={deleteRef}
			>
				{m.del()}
				<IconSpinner icon={Trash} busy={$gallerySubmitter === deleteRef} />
			</button>
			<button
				class="button button-ghost backdrop-blur-sm"
				data-state={isBanner ? 'checked' : undefined}
				form={$galleryFormId}
				type="submit"
				name="bannerId"
				value={$form.id}
				formaction="?/{isBanner ? 'demote' : 'promote'}"
				bind:this={bannerRef}
			>
				<IconSpinner
					icon={isBanner ? Wallpaper : Square}
					busy={$gallerySubmitter === bannerRef}
				/>{m.project_image_set_banner()}
			</button>
		</menu>
	</div>
</figure>

<DialogBox {dialog} class="min-w-sm">
	<form use:enhance method="POST">
		<Field>
			{#snippet label()}
				{m.project_image_type()}
			{/snippet}
			<select name="imageTypeId" class="button button-bordered">
				{#await types then awaitedTypes}
					{#each awaitedTypes as type}
						<option value={type.id}>{type.title}</option>
					{/each}
				{/await}
			</select>
		</Field>
	</form>
	{#snippet title()}{/snippet}
	{#snippet actions()}
		<button bind:this={submitRef} class="button button-cta">
			<IconSpinner icon={Check} busy={submitRef === $submitter} />{m.save()}
		</button>
	{/snippet}
</DialogBox>
