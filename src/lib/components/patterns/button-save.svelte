<script lang="ts" generics="T extends AnyZodObject">
	import * as m from '$i18n/messages';
	import type { LoadableSubmitter } from '$lib/builders/loading';
	import { Save } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { fly, scale } from 'svelte/transition';
	import type { AnyZodObject } from 'zod';
	import LangKey from './LangKey.svelte';

	type $$Props = Omit<HTMLButtonAttributes, 'class'> & {
		submitter: LoadableSubmitter['elements']['root'];
		disabled?: boolean;
	};

	export let submitter: LoadableSubmitter['elements']['root'];
	export let disabled: boolean | undefined = undefined;

	let submitRef: HTMLButtonElement;
</script>

<button
	class="button cta"
	type="submit"
	{...$$restProps}
	in:fly|global={{ y: 6, duration: 250, easing: expoOut }}
	out:scale={{ start: 0.95, duration: 200, easing: cubicOut }}
	bind:this={submitRef}
	use:submitter.action
	{...$submitter(submitRef, { disabled })}
>
	<LangKey>
		{m.save()}
	</LangKey>
	<Save />
</button>

<style>
</style>
