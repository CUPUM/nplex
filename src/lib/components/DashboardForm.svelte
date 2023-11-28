<script lang="ts" generics="T extends AnyZodObject">
	import LangKey from './LangKey.svelte';

	import * as m from '$i18n/messages';
	import type { LoadableSubmitter } from '$lib/builders/loading';
	import type { SuperForm } from '$lib/forms/super-form';
	import { melt } from '@melt-ui/svelte';
	import { SaveAll } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import type { TaintedFields, ZodValidation } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';

	export let enhance: SuperForm<ZodValidation<T>>['enhance'];
	export let action: string | undefined = undefined;
	export let method = 'POST';
	export let tainted: Writable<TaintedFields<T> | undefined>;
	export let submitter: LoadableSubmitter['elements']['root'];
	export let formaction: string | undefined = undefined;
	export let form: string | undefined = undefined;
	export let disabled: boolean | null | undefined = undefined;

	let submitRef: HTMLButtonElement;

	$: hideMenu = !$tainted && !$$slots.menu;
</script>

<form {action} use:enhance {method}>
	{#if $$slots.header}
		<header>
			<hgroup class="prose">
				<slot name="header" />
			</hgroup>
		</header>
	{/if}
	<slot />
	<menu data-hidden={hideMenu || undefined}>
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
				<LangKey>
					{m.save}
				</LangKey>
				<SaveAll />
			</button>
		{/if}
		<slot name="menu" />
	</menu>
</form>

<style lang="postcss">
	form {
		grid-column: 1 / -1;
		display: inherit;
		grid-template-columns: inherit;
		gap: inherit;
		border-radius: inherit;
		background-color: var(--dashboard-bg);
	}

	header {
		grid-column: 1 / -1;
		padding: 2rem;
		padding-top: 0;
		border-bottom: var(--base-border-width) solid
			color-mix(in srgb, var(--base-border-color) 50%, transparent);
	}

	menu {
		position: sticky;
		grid-column: center;
		align-self: center;
		justify-self: center;
		bottom: 2rem;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: row;
		align-self: center;
		padding: var(--base-nesting);
		border-radius: calc(var(--base-radius) + var(--base-nesting));
		margin-inline: 2rem;
		align-items: flex-start;
		justify-content: center;
		gap: 0.5rem;
		font-size: var(--size-sm);
		background-color: color-mix(in srgb, var(--color-neutral-50) 50%, transparent);
		backdrop-filter: blur(8px);
		min-height: calc(var(--base-block-size) + 2 * var(--base-nesting));
		transition: all var(--duration-medium) var(--ease-out-expo);

		:global(:--dark) & {
			background-color: color-mix(in srgb, var(--color-neutral-800) 50%, transparent);
		}

		&:empty,
		&[data-hidden] {
			opacity: 0;
			transform: translateY(0.5em);
			pointer-events: none;
			transition: all var(--duration-fast) var(--ease-in-expo);
		}
	}
</style>
