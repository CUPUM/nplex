<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { switchCrossfade } from '$lib/motion/presets';
	import type { PageData } from './$types';

	let { form, types }: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'types'> = $props();
</script>

<fieldset class="dashboard-section">
	<legend class="dashboard-section-title">
		{m.project_type()}
	</legend>
	<div class="dashboard-section-content">
		<menu class="switch big self-center" use:ripple>
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
								in:switchCrossfade.receive={{ key: 'project-type' }}
								out:switchCrossfade.send={{ key: 'project-type' }}
							></div>
						{/if}
						{pt.title}
					</label>
				{/each}
			{/await}
		</menu>
	</div>
</fieldset>
