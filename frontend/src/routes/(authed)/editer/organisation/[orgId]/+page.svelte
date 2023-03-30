<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import Select from '$components/Select/Select.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { dirtyValues } from '../../common';
	import { ORG_NAME_MAX, ORG_SHORT_NAME_MAX } from '../constants';

	export let data;

	let editName = data.organisation.name;
	let editShortName = data.organisation.short_name;

	function syncDown() {
		editName = data.organisation.name;
		editShortName = data.organisation.short_name;
	}
</script>

<Dirty sample={data.organisation.name} specimen={editName} bind:dirty={$dirtyValues.name} />
<Dirty
	sample={data.organisation.short_name}
	specimen={editShortName}
	bind:dirty={$dirtyValues.shortName}
/>
<header class="editor-form-header">
	<h2 class="heading-lg">Général</h2>
	<p class="subtle">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas nihil quae sapiente culpa
		labore, nemo provident vel nostrum unde placeat!
	</p>
</header>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Présentation</h3>
	<div class="pres">
		<div class="name">
			<Field
				name="name"
				bind:value={editName}
				style="flex: 2; min-width: 250px"
				maxlength={ORG_NAME_MAX}
			>
				<svelte:fragment slot="label">Nom de l'organisation</svelte:fragment>
			</Field>
			<Field
				name="short_name"
				bind:value={editShortName}
				style="flex: 1; min-width: 250px"
				maxlength={ORG_SHORT_NAME_MAX}
			>
				<svelte:fragment slot="label">Nom court ou abbréviation</svelte:fragment>
			</Field>
		</div>
		<TextArea>
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</div>
</fieldset>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Expertise</h3>
	<div class="expertise">
		<Select options={data.orgTypes}>
			<svelte:fragment slot="label">Expertise principale</svelte:fragment>
			<option slot="option" let:option value={option.id}>{option.title}</option>
		</Select>
	</div>
</fieldset>

<style lang="scss">
	.pres,
	.name {
		display: flex;
		flex-direction: column;
		gap: var(--ui-gap-md);
	}

	.name {
		flex-direction: row;
		flex-wrap: wrap;
	}

	.expertise {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
