<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { link } from '$lib/i18n/location';
</script>

<hgroup>
	<h1 class="heading xl">
		{#if $page.data.title}
			{$page.data.title}
		{:else}
			<span class="fallback">
				{m.project_untitled()}
			</span>
		{/if}
	</h1>
</hgroup>
<menu>
	<a {...$link('/edit/projects')} class="button ghost compact">
		{m.projects()}
	</a>
</menu>

<style>
	hgroup {
		padding: 2rem;
		min-height: 25vh;
	}

	.fallback {
		opacity: 0.5;
		font-weight: 500;
	}

	menu {
		padding: 1rem;
	}
</style>
