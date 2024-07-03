<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let { form, expertises }: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'expertises'> =
		$props();

	const key = {};
</script>

<DashboardSubSection>
	{#snippet header()}
		<h3>
			{m.organization_expertises()}
		</h3>
	{/snippet}
	<ul class="gap-gap flex flex-row flex-wrap">
		{#await expertises}
			...
		{:then awaitedExpertises}
			{#each awaitedExpertises as expertise (expertise.id)}
				<label class="button button-dashed rounded-full">
					<input
						type="checkbox"
						name="expertisesIds"
						bind:group={$form.expertisesIds}
						value={expertise.id}
						class="sr-only"
					/>
					{expertise.title}
				</label>
			{/each}
		{/await}
	</ul>
</DashboardSubSection>
