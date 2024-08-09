<script>
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { OctagonAlert, RefreshCw } from 'lucide-svelte';
</script>

<article
	class="p-card-padding relative flex h-full w-full flex-1 flex-col items-center justify-center"
>
	<div class="p-lg bg-card rounded-section gap-sm flex w-xs max-w-full flex-col">
		<p class="text-error font-bold">
			<OctagonAlert class="mr-[0.25em] inline-block animate-pulse align-text-bottom opacity-65" />
			{m.error()}
		</p>
		<p class="opacity-soft">
			{$page.status}:
			{#if $page.error?.message}
				{$page.error.message}
			{:else}
				<span class="opacity-soft italic">{m.no_error_message()}</span>
			{/if}
		</p>
		<a href={$page.url.toString()} class="button mt-md self-center text-sm">
			<RefreshCw />{m.reset()}
		</a>
	</div>
</article>
