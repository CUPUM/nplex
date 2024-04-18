<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	let {
		children,
		...buttonProps
	}: (
		| ({
				href: string;
		  } & Omit<HTMLAnchorAttributes, 'class' | 'style'>)
		| ({
				href?: undefined;
		  } & Omit<HTMLButtonAttributes, 'class' | 'style'>)
	) & {
		'children': Snippet;
		'data-square'?: boolean;
	} = $props();
</script>

<svelte:element
	this={buttonProps.href ? 'a' : 'button'}
	{...buttonProps}
	class="px-brick-padding-x hover:text-primary relative inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-bold transition-all data-[square]:aspect-square data-[square]:px-0"
>
	{@render children()}
</svelte:element>
