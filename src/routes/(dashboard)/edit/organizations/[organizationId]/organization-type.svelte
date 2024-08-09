<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import SwitchThumb from '$lib/components/primitives/switch-thumb.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let { form, types }: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'types'> = $props();

	const key = {};
</script>

<DashboardSubSection>
	{#snippet header()}
		<h3>
			{m.organization_type()}
		</h3>
	{/snippet}
	<menu class="switch self-center" use:ripple>
		{#await types}
			<div class="switch-item">
				<Spinner />
			</div>
		{:then awaitedTypes}
			{#each awaitedTypes as type (type.id)}
				<label class="switch-item">
					<input
						type="radio"
						name="typeId"
						bind:group={$form.typeId}
						value={type.id}
						class="sr-only"
					/>
					<SwitchThumb current={$form.typeId === type.id} {key} />
					{type.title}
				</label>
			{/each}
		{/await}
	</menu>
</DashboardSubSection>
