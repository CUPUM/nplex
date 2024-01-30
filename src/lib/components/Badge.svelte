<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', A extends Action">
	import { useActions } from '$lib/actions/use-actions';
	import type { Action } from 'svelte/action';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = {
		as?: T;
		square?: boolean;
		use?: Act;
	} & Omit<HTMLAttributes<HTMLElementTagNameMap[T]>, 'class'>;

	export let as: $$Props['as'] | 'div' = 'div';
	export let square: $$Props['square'] = undefined;
	export let use: Action;

	let ref: HTMLElement;
	let used: ReturnType<Action>[];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={as}
	class="badge"
	class:square
	on:click
	bind:this={ref}
	{...$$restProps}
	use:useActions={use}
>
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="content">
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
</svelte:element>

<style lang="postcss">
	.badge {
		position: absolute;
		top: 0;
		right: 0;
		translate: -50% -50%;
		padding: 1em;
		background: blue;
		border-radius: var(--radius-full);
		font-size: var(--badge-font-size, var(--ratio-small));
	}
</style>
