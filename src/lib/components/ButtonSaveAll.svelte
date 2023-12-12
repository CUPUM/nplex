<script lang="ts" generics="T extends AnyZodObject">
	import * as m from '$i18n/messages';
	import type { LoadableSubmitter } from '$lib/builders/loading';
	import { SaveAll } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import type { AnyZodObject } from 'zod';
	import LangKey from './LangKey.svelte';

	// export let tainted: Writable<TaintedFields<T>>;
	export let submitter: LoadableSubmitter['elements']['root'];
	export let formaction: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	let submitRef: HTMLButtonElement;
</script>

<button
	class="button cta"
	type="submit"
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

<style lang="postcss">
</style>
