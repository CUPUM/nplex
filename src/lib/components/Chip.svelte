<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div'">
	import type { Action } from 'svelte/action';

	export let as: T | 'div' = 'div';
	export let variant: 'default' | 'outlined' | 'dashed' | 'ghost' = 'default';
	// export let use: Action[] | undefined = undefined;

	let ref: HTMLElement;
	let used: ReturnType<Action>[];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={as} class="token {variant}" on:click bind:this={ref}>
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

<style>
	.token {
		position: relative;
		padding: 1em;
		border: 1px solid var(--color-neutral-500);
		border-radius: var(--radius-full);
	}
</style>
