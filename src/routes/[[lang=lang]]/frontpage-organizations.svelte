<script lang="ts">
	import * as m from '$i18n/messages';
	import { withLang } from '$lib/i18n/location';
	import { ArrowRight } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article class="gap-md px-padding py-lg flex flex-col items-stretch self-stretch">
	<a
		href={withLang('/organizations')}
		class="group/button py-lg border-dim mx-auto flex w-full max-w-xl flex-row items-center justify-between self-center border-t"
	>
		<h2
			class="text-base-accent group-hover/button:text-primary text-2xl font-semibold transition-all"
		>
			{m.recent_organizations()}
		</h2>
		<div class="button button-ghost text-sm">
			{m.explore()}<ArrowRight />
		</div>
	</a>
	<ul class="gap-padding flex flex-row flex-wrap place-content-start items-center justify-center">
		{#each data.featuredOrganizations as organization}
			<a
				href={withLang(`/organizations/${organization.id}`)}
				class="p-card-padding rounded-card bg-card flex aspect-[3/2] h-[200px] flex-[none]"
			>
				{organization.id}
			</a>
		{/each}
	</ul>
</article>
