<script lang="ts">
	import type { ToastInstance } from '$lib/builders/toasts.svelte';
	import { X } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { instance }: { instance: ToastInstance } = $props();
</script>

<aside
	class="bg-popover relative max-w-sm overflow-hidden rounded-sm text-base text-sm shadow-lg"
	{...instance.toastAttributes}
	in:fly|global={{ y: '50%', easing: expoOut, duration: 350, opacity: 0 }}
	out:fly|global={{ x: '100%', easing: cubicOut, duration: 250, opacity: 0 }}
>
	{#if instance.duration}
		<progress
			dir="rtl"
			class="absolute top-0 right-[1.25rem] left-[1.25rem] h-[3px] w-auto"
			max="1"
			value={1 - instance.progress}
		></progress>
	{/if}
	{#if 'body' in instance.content}
		<div class="flex flex-row">
			<div class="flex flex-col p-[1.5rem]">
				{#if 'title' in instance.content}
					<section>{@html instance.content.title}</section>
				{/if}
				<section>
					{@html instance.content.body}
				</section>
			</div>
			{#if instance.dismissable}
				<menu class="py-[1rem] pr-[1rem]">
					<button
						class="button button-ghost compact aspect-square rounded-full text-sm"
						{...instance.closeAttributes}
					>
						<X />
					</button>
				</menu>
			{/if}
		</div>
	{:else if 'snippet' in instance.content}
		{@render instance.content.snippet(instance)}
	{:else if 'component' in instance.content}
		<svelte:component this={instance.content.component} {...instance.content.props} />
	{/if}
</aside>
