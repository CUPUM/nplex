<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { flip } from 'svelte/animate';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import ProjectImage from './project-image.svelte';
	import ProjectNewImages from './project-new-images.svelte';

	let { data } = $props();

	const galleryForm = extendedSuperForm(data.galleryForm, { invalidateAll: 'force' });
	const { formId, enhance } = galleryForm;
</script>

<DashboardSubHeader>
	<h2>{m.project_gallery()}</h2>
</DashboardSubHeader>
<ProjectNewImages {...data} />
<form method="POST" id={$formId} use:enhance class="sr-only"></form>
<DashboardSubSection>
	{#snippet header()}
		<h3>Images</h3>
	{/snippet}
	<ul
		class="gap-padding grid grid-cols-[repeat(auto-fill,minmax(var(--width-xs),1fr))] self-stretch"
	>
		{#each data.imageForms as imageForm, i (imageForm.id)}
			<li
				animate:flip={{ duration: 250, easing: expoInOut }}
				in:fly={{ y: 6, easing: expoOut }}
				out:scale={{ duration: 50, start: 0.95 }}
				class="relative aspect-square"
			>
				<ProjectImage {imageForm} {...galleryForm} types={data.types} />
			</li>
		{/each}
	</ul>
</DashboardSubSection>
