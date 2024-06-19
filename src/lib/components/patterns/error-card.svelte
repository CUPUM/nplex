<script>
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
</script>

<article class="prose p-card-padding bg-base rounded-sm shadow-sm">
	<h1 class="text-error-accent">{$page.status}</h1>
	<p>
		{#if $page.error?.message}
			{$page.error.message}
		{:else}
			<span class="opacity-dim font-normal">{m.no_error_message()}</span>
		{/if}
	</p>
</article>
