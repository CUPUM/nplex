<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
</script>

<article class="flex flex-1 items-center justify-center">
	<div class="flex flex-col">
		<span>{$page.error}</span>
		<h1 class="h5">Oops! {m.error_details()}</h1>
		<code>
			{#if $page.error?.message}
				{$page.error.message}
			{:else}
				{m.error_no_message()}
			{/if}
		</code>
	</div>
</article>

<style>
</style>
