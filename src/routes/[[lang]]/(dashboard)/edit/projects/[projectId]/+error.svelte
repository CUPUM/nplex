<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { STATUS_CODES } from '$lib/common/constants';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<article>
	{#if $page.status === STATUS_CODES.NOT_FOUND}
		<h1 class="h4">
			{m.project_not_found()}
		</h1>
		<a {...linkAttributes('/edit/projects')} class="button link">
			<ArrowLeft />
			{m.project_not_found_browse()}
		</a>
	{/if}
</article>
