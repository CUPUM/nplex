<script lang="ts">
	import * as m from '$i18n/messages';
	import { SaveAll } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { fly, scale } from 'svelte/transition';
	import IconSpinner from './icon-spinner.svelte';

	let {
		submitter,
		disabled,
		...buttonProps
	}: Omit<HTMLButtonAttributes, 'class'> & {
		submitter?: HTMLElement | null;
		disabled?: boolean;
	} = $props();

	let buttonRef = $state<HTMLButtonElement>();
	let isCurrent = $derived(buttonRef === submitter);
</script>

<button
	class="button button-cta"
	type="submit"
	{...buttonProps}
	in:fly|global={{ y: 6, duration: 250, easing: expoOut }}
	out:scale={{ start: 0.95, duration: 200, easing: cubicOut }}
	bind:this={buttonRef}
	disabled={isCurrent}
>
	{m.save()}
	<IconSpinner icon={SaveAll} busy={isCurrent} />
</button>
