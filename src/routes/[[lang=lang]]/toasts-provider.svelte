<script lang="ts" context="module">
	export const toasts = new Toasts();
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { portal } from '$lib/actions/portal';
	import { Toasts } from '$lib/builders/toasts.svelte';
	import Toast from '$lib/components/patterns/toast.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { getFlash } from 'sveltekit-flash-message';

	const flash = getFlash(page);

	$effect(() => {
		if ($flash) {
			toasts.add($flash);
			flash.set(undefined);
		}
	});
</script>

<div
	use:portal
	class="p-gutter gap-menu-gutter fixed right-0 bottom-0 flex max-h-full max-w-full flex-col items-end overflow-y-scroll"
>
	{#each toasts.all as instance, i (instance)}
		<div animate:flip={{ duration: 200, easing: cubicOut }}>
			<Toast {instance} />
		</div>
	{/each}
</div>
