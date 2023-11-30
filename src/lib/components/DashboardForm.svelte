<script lang="ts" generics="T extends AnyZodObject">
	import LangKey from './LangKey.svelte';

	import type { enhance as regularEnhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import type { LoadableSubmitter } from '$lib/builders/loading';
	import type { SuperForm } from '$lib/forms/super-form';
	import { SaveAll } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import type { TaintedFields, ZodValidation } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';

	type $$Props = {
		action?: string;
		method?: string;
		formaction?: string;
		form?: string;
		disabled?: boolean | null;
	} & (
		| { enhance?: typeof regularEnhance; tainted?: undefined; submitter?: undefined }
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
	export let form: $$Props['form'] = undefined;
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
				{form}
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

	hgroup :global(p) {
		opacity: var(--opacity-dim);
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
