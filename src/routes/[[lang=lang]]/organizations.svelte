<script lang="ts">
	import * as m from '$i18n/messages';
	import { withLang } from '$lib/i18n/location';
	import { ArrowRight } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article class="gap-lg px-padding py-lg flex flex-col items-stretch self-stretch">
	<a
		href={withLang('/organizations')}
		class="group/button max-w-main mx-auto flex w-full flex-row items-center justify-between self-center"
	>
		<h2 class="group-hover/button:text-base-accent text-2xl text-base font-bold transition-all">
			{m.recent_organizations()}
		</h2>
		<div class="button button-ghost rounded-full text-sm">
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
