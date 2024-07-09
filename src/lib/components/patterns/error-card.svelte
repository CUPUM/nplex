<script>
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { OctagonAlert, RefreshCw } from 'lucide-svelte';
</script>

<article
	class="p-card-padding relative flex h-full w-full flex-1 flex-col items-center justify-center"
>
	<div
		class="p-section-padding rounded-section bg-card relative flex flex-col justify-center overflow-hidden"
	>
		<OctagonAlert class="size-2xl text-error absolute self-center opacity-5" />
		<div class="gap-padding z-1 flex flex-col items-start">
			<p class="text-error font-bold">
				{m.error()}: {$page.status}
			</p>
			<p class="opacity-soft text-sm font-thin">
				{#if $page.error?.message}
					{$page.error.message}
				{:else}
					<span class="opacity-soft italic">{m.no_error_message()}</span>
				{/if}
			</p>
			<a href={$page.url.toString()} class="button text-sm"><RefreshCw />{m.reset()}</a>
		</div>
	</div>
</article>
