<script lang="ts">
	import * as m from '$i18n/messages';
	import OrganizationCard from '$lib/components/patterns/organization-card.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { ArrowRight, Building2 } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article class="gap-lg px-padding py-lg flex flex-col items-stretch self-stretch">
	<a
		href="/organizations"
		class="group/button max-w-main mx-auto flex w-full flex-row items-center justify-between self-center"
	>
		<h2 class="group-hover/button:text-base-accent text-2xl text-base font-bold transition-all">
			{m.recent_organizations()}
		</h2>
		<div class="button button-ghost rounded-full text-sm">
			{m.see_more()}<ArrowRight />
		</div>
	</a>
	<ul
		class="gap-gap max-w-main grid w-full grid-cols-[repeat(auto-fill,minmax(var(--width-xs),1fr))] self-center"
	>
		{#each data.featuredOrganizations as organization, i (organization.id)}
			<li class="aspect-3/2">
				<OrganizationCard {...organization} class="h-full w-full" />
			</li>
		{/each}
	</ul>
	<a
		href="/organizations"
		class="button button-cta big self-center rounded-full text-sm"
		use:ripple
	>
		<Building2 />
		{m.explore()}
		<ArrowRight />
	</a>
</article>
