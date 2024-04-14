<script lang="ts" generics="T extends AnyZodObject">
	import type { enhance as regularEnhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import type { LoadableSubmitter } from '$lib/builders/loading';
	import type { SuperForm } from '$lib/crud/validation/forms/super-form';
	import { SaveAll } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import type { TaintedFields, ZodValidation } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';
	import LangKey from './LangKey.svelte';

	type $$Props = {
		action?: string;
		method?: string;
		formaction?: string;
		disabled?: boolean | null;
	} & (
		| {
				enhance?: typeof regularEnhance | SuperForm<ZodValidation<T>>['enhance'];
				tainted?: undefined;
				submitter?: undefined;
		  }
		| {
				enhance: SuperForm<ZodValidation<T>>['enhance'];
				tainted: Writable<TaintedFields<T> | undefined>;
				submitter: LoadableSubmitter['elements']['root'];
		  }
	);

	export let enhance: $$Props['enhance'] = undefined;
	export let action: $$Props['action'] = undefined;
	export let method: $$Props['method'] = 'POST';
	export let tainted: $$Props['tainted'] = undefined;
	export let submitter: $$Props['submitter'] = undefined;
	export let formaction: $$Props['formaction'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;

	let submitRef: HTMLButtonElement;

	$: hideMenu = !$tainted && !$$slots.menu;
	$: _enhance = enhance ?? (() => {});
</script>

<form {action} use:_enhance {method}>
	{#if $$slots.header}
		<header>
			<hgroup class="prose">
				<slot name="header" />
			</hgroup>
		</header>
	{/if}
	<slot />
	<menu data-hidden={hideMenu || undefined}>
		{#if submitter && $submitter && tainted && $tainted}
			<button
				class="button cta"
				type="submit"
				{formaction}
				in:fly={{ y: 6, duration: 250, easing: expoOut }}
				out:scale={{ start: 0.95, duration: 200, easing: cubicOut }}
				bind:this={submitRef}
				use:submitter.action
				{...$submitter(submitRef)}
			>
				<LangKey>
					{m.save()}
				</LangKey>
				<SaveAll />
			</button>
		{/if}
		<slot name="menu" />
	</menu>
</form>

<style>
</style>
