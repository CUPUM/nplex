<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { switchThumbCrossfade } from '$lib/motion/presets';
	import type { PageData } from './$types';

	let { form, types }: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'types'> = $props();
</script>

<DashboardSubSection class="items-center">
	{#snippet header()}
		<h4>
			{m.project_type()}
		</h4>
	{/snippet}
	<menu class="switch self-center" use:ripple>
		{#await types}
			<div class="switch-item">
				<Spinner />
			</div>
		{:then awaitedTypes}
			{#each awaitedTypes as pt (pt.id)}
				<label class="switch-item">
					<input
						type="radio"
						name="typeId"
						bind:group={$form.typeId}
						value={pt.id}
						class="sr-only"
					/>
					{#if $form.typeId === pt.id}
						<div
							class="switch-thumb"
							in:switchThumbCrossfade.receive={{ key: 'project-type' }}
							out:switchThumbCrossfade.send={{ key: 'project-type' }}
						></div>
					{/if}
					{pt.title}
				</label>
			{/each}
		{/await}
	</menu>
</DashboardSubSection>
