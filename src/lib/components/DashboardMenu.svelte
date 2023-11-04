<script lang="ts" generics="T extends AnyZodObject">
	import type { LoadableSubmitter } from '$lib/builders/loading';
	import { createTranslations } from '$lib/i18n/translate';
	import { tt } from '$lib/i18n/translations';
	import { melt } from '@melt-ui/svelte';
	import { SaveAll } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import type { TaintedFields } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';

	const t = createTranslations({
		fr: {
			save: tt.fr.editor.client.save,
		},
		en: {
			save: tt.en.editor.client.save,
		},
	});

	export let tainted: Writable<TaintedFields<T> | undefined>;
	export let submitter: LoadableSubmitter['elements']['root'];
	export let formaction: string | undefined = undefined;
	export let form: string | undefined = undefined;
	export let disabled: boolean | null | undefined = undefined;

	let submitRef: HTMLButtonElement;
</script>

<menu>
	{#if $tainted}
		<button
			class="button cta"
			type="submit"
			{formaction}
			{form}
			disabled={disabled || undefined}
			in:fly={{ y: 6, duration: 250, easing: expoOut }}
			out:scale={{ start: 0.95, duration: 200, easing: cubicOut }}
			bind:this={submitRef}
			use:melt={$submitter(submitRef)}
		>
			{$t.save}
			<SaveAll class="button-icon" />
		</button>
	{/if}
	<slot />
</menu>

<style lang="postcss">
	menu {
		position: sticky;
		bottom: 2rem;
		display: flex;
		flex-direction: row;
		align-self: center;
		padding: var(--base-inset);
		border-radius: calc(var(--base-radius) + var(--base-inset));
		margin-inline: 2rem;
		align-items: flex-start;
		justify-content: center;
		gap: 0.5rem;
		font-size: var(--size-sm);
		background-color: color-mix(in srgb, var(--color-neutral-50) 50%, transparent);
		backdrop-filter: blur(8px);
		min-height: calc(var(--base-size) + 2 * var(--base-inset));
		transition: all var(--duration-medium) var(--ease-out-expo);

		:global(:--dark) & {
			background-color: color-mix(in srgb, var(--color-neutral-800) 50%, transparent);
		}

		&:empty {
			opacity: 0;
			transform: translateY(0.5em);
			pointer-events: none;
			transition: all var(--duration-fast) var(--ease-in-expo);
		}

		@container (width > 1200px) {
			margin-inline: 0;
			margin-right: var(--dashboard-navbar);
		}
	}
</style>
