<script lang="ts" context="module">
	export const toasts = new Toasts();
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { portal } from '$lib/actions/portal';
	import { Toasts } from '$lib/builders/toasts.svelte';
	import Toast from '$lib/components/patterns/toast.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { getFlash } from 'sveltekit-flash-message';

	const flash = browser ? getFlash(page) : undefined;

	$effect(() => {
		if (flash && $flash) {
			toasts.add($flash);
			flash.set(undefined);
		}
	});
</script>

<div
	use:portal
	class="p-gap gap-input-group-gap fixed right-0 bottom-0 flex max-h-full max-w-full flex-col items-end overflow-y-scroll"
>
	{#each toasts.all as instance, i (instance)}
		<div animate:flip={{ duration: 200, easing: cubicOut }}>
			<Toast {instance} />
		</div>
	{/each}
</div>
