<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import Select from '$components/Select/Select.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { dirtyValues } from '../../common';
	import { ORG_NAME_MAX, ORG_SHORT_NAME_MAX } from '../constants';

	export let data;

	let orgName = data.organisation.name;
	let orgShortName = data.organisation.short_name;
	let orgAbout = data.organisation.about;
	let orgType = data.organisation.type;
	let orgUrl = data.organisation.url;

	function syncDown() {
		orgName = data.organisation.name;
		orgShortName = data.organisation.short_name;
		orgAbout = data.organisation.about;
		orgType = data.organisation.type;
		orgUrl = data.organisation.url;
	}

	$: data, syncDown();
</script>

<Dirty sample={data.organisation.name} specimen={orgName} bind:dirty={$dirtyValues.name} />
<Dirty
	sample={data.organisation.short_name}
	specimen={orgShortName}
	bind:dirty={$dirtyValues.short_name}
/>
<Dirty sample={data.organisation.about} specimen={orgAbout} bind:dirty={$dirtyValues.about} />
<Dirty sample={data.organisation.url} specimen={orgUrl} bind:dirty={$dirtyValues.url} />
<Dirty sample={data.organisation.type} specimen={orgType} bind:dirty={$dirtyValues.type} />
<header class="editor-form-header">
	<h2 class="heading-lg">Général</h2>
	<p class="subtle">
		Utilisez cette page-ci pour compléter la description générale de l'organisation.
	</p>
</header>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Présentation</h3>
	<div class="pres">
		<div class="name">
			<Field
				name="name"
				bind:value={orgName}
				style="flex: 2; min-width: 250px"
				maxlength={ORG_NAME_MAX}
			>
				<svelte:fragment slot="label">Nom de l'organisation</svelte:fragment>
			</Field>
			<Field
				name="short_name"
				bind:value={orgShortName}
				style="flex: 1; min-width: 250px"
				maxlength={ORG_SHORT_NAME_MAX}
			>
				<svelte:fragment slot="label">Nom court ou abbréviation</svelte:fragment>
			</Field>
		</div>
		<TextArea name="description">
			<svelte:fragment slot="label">À propos de l'organisation</svelte:fragment>
		</TextArea>
		<Field name="url" bind:value={orgUrl}>
			<svelte:fragment slot="label">Lien URL</svelte:fragment>
		</Field>
	</div>
</fieldset>
<fieldset class="editor-form-group">
	<h2 class="editor-form-group-title">Type d'organisation</h2>
	<div id="org-type">
		<Select name="type" options={data.orgTypes} bind:value={orgType}>
			<svelte:fragment slot="label">Expertise principale</svelte:fragment>
			<option slot="option" let:option value={option.id}>{option.title}</option>
		</Select>
	</div>
</fieldset>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Expertise</h3>
	<p class="subtle">À venir</p>
</fieldset>

<style lang="scss">
	.pres,
	.name {
		display: flex;
		flex-direction: column;
		gap: var(--ui-gutter-sm);
	}

	.name {
		flex-direction: row;
		flex-wrap: wrap;
	}

	#org-type {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
