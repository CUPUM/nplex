<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'label'">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { cn } from '../utilities';

	let {
		as = 'label' as T,
		label,
		description,
		children,
		errors,
		class: className,
		...fieldProps
	}: {
		as?: T;
		label?: Snippet;
		description?: Snippet;
		errors?: null | string[];
	} & HTMLAttributes<HTMLElementTagNameMap[T]> = $props();
</script>

<svelte:element
	this={as as string}
	{...fieldProps}
	class={cn('group/field flex flex-col', className)}
>
	{#if label}
		<span
			in:fly|global={{ y: 6, opacity: 0 }}
			class="mb-[0.75em] text-base text-[clamp(var(--font-size-xs),0.75em,var(--font-size-md))] font-semibold"
		>
			{@render label()}
		</span>
	{/if}
	{#if description}
		<div class="text-base-dim text-[clamp(var(--font-size-xs),0.75em,var(--font-size-sm))]">
			{@render description()}
		</div>
	{/if}
	{@render children?.()}
	{#if errors && errors.length}
		<div
			class="text-input-error-dim mt-[0.75em] flex flex-col text-[clamp(var(--font-size-xs),0.35em,var(--font-size-sm))]"
		>
			{#each errors as err, i}
				<span
					in:fly={{ duration: 150, delay: i * 50 }}
					out:fly={{ duration: 100, delay: (errors.length - 1 - i) * 25 }}
				>
					{err}
				</span>
			{/each}
		</div>
	{/if}
</svelte:element>
