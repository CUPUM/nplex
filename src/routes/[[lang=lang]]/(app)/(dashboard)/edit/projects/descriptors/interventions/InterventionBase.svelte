<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SuperFormData } from '$lib/forms/types';
	import { melt } from '@melt-ui/svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';

	export let types: PageData['types'];
	export let form: SuperFormData<PageData['interventionForms'][number]>['form'];
</script>

<fieldset class="types">
	<legend>
		<LangKey>{m.project_types()}</LangKey>
	</legend>
	<ul>
		{#each types as pt, i}
			<li in:scale|global={{ start: 0.9, duration: 500, easing: expoOut, delay: i * 35 }}>
				<Tooltip let:trigger>
					<svelte-fragment slot="content">
						{pt.translations[$page.data.lang].description || m.no_description()}
					</svelte-fragment>
					<label class="chip compact" use:melt={trigger}>
						<span class="chip-content">{pt.translations[$page.data.lang].title}</span>
						<input
							type="checkbox"
							value={pt.id}
							class="visually-hidden"
							bind:group={$form.projectTypesIds}
						/>
					</label>
				</Tooltip>
			</li>
		{/each}
	</ul>
</fieldset>
<label class="permit">
	<div class="toggle compact">
		<div class="toggle-thumb" />
		<input type="checkbox" class="visually-hidden" bind:checked={$form.maybePermit} />
	</div>
	<span>
		<LangKey>
			{m.potentially_requires_permit()}
		</LangKey>
	</span>
</label>

<style lang="postcss">
	.types {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;

		ul {
			display: flex;
			flex-direction: row;
			gap: 0.5em;
			flex-wrap: wrap;
		}
	}

	.permit {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	label {
		font-size: var(--size-sm);
	}
</style>
