<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { Paintbrush } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	const t = createTranslations({
		fr: {
			noname: 'Organisation sans nom',
		},
		en: {
			noname: 'Unnamed organization',
		},
	});

	export let organization: Awaited<LayoutData['streamed']['editableOrganizations']>[number];
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a {...$link(`/edit/projects/${organization.id}`)} class="card" use:ripple>
	<Paintbrush class="card-icon" />
	{#if organization.name}
		{organization.name}
	{:else}
		<span class="dimmer">{$t.noname}</span>
	{/if}
</a>

<style lang="postcss">
</style>
