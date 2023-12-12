<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import ButtonIconPlus from '$lib/components/ButtonIconPlus.svelte';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { flip } from 'svelte/animate';
	import ProjectType from './ProjectType.svelte';

	export let data;

	let lang = $page.data.lang;
</script>

<DashboardForm>
	<svelte:fragment slot="header">
		<h2><LangKey>{m.project_descriptors_types()}</LangKey></h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
			consequatur amet blanditiis sed alias. Eum, numquam magnam!
		</p>
	</svelte:fragment>
	<ul>
		{#each data.forms as form, i (form.id)}
			<li animate:flip={{ duration: 150 }}>
				<ProjectType data={form} {lang} />
			</li>
		{/each}
	</ul>
	<svelte:fragment slot="menu">
		<a
			{...$link('/edit/projects/descriptors/types/new')}
			class="button dashed rounded"
			use:ripple
			data-sveltekit-replacestate
		>
			<LangKey>{m.create()}</LangKey><ButtonIconPlus />
		</a>
	</svelte:fragment>
</DashboardForm>
<slot />

<style lang="postcss">
	ul {
		grid-column: center;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 2rem;
		flex-wrap: wrap;
	}
</style>
