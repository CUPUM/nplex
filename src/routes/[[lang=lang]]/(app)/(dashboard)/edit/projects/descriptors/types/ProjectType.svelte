<script lang="ts" generics="T extends AnyZodObject">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import ButtonIconPencil from '$lib/components/ButtonIconPencil.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import LangTabs from '$lib/components/LangTabs.svelte';
	import { superFormDialog } from '$lib/forms/super-form';
	import { melt } from '@melt-ui/svelte';
	import type { AnyZodObject } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData['forms'][number];
	export let lang: AvailableLanguageTag;

	const {
		elements: { trigger, ...restElements },
		states: { open },
		form,
		errors,
		tainted,
	} = superFormDialog(data, { dataType: 'json' });
</script>

<div class="button rounded">
	{#if $form.translations[$page.data.lang].title}
		{$form.translations[$page.data.lang].title}
	{:else}
		<span class="untitled">
			<LangKey>{m.noTitle()}</LangKey>
		</span>
	{/if}
	<ButtonIconPencil />
	<button class="button-fill" type="button" use:melt={$trigger}></button>
	<button class="button danger rounded square compact" type="submit" formaction="?/delete"></button>
</div>
<Dialog {open} {...restElements}>
	<LangTabs>test</LangTabs>
</Dialog>

<style lang="postcss">
	.untitled {
		opacity: var(--opacity-dimmer);
		font-style: italic;
		font-weight: 300;
		white-space: nowrap;
	}
</style>
