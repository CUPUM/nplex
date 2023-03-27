<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import { editorDirtyValues } from '../../common';
	import { NAME_MAX } from '../common';
	import { SHORT_NAME_MAX } from './common';

	export let data;

	let editName = data.organization.name;
	let editShortName = data.organization.short_name;

	function syncDown() {
		editName = data.organization.name;
		editShortName = data.organization.short_name;
	}
</script>

<header class="editor-form-header">
	<h2 class="heading-lg">Général</h2>
	<p class="subtle">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas nihil quae sapiente culpa
		labore, nemo provident vel nostrum unde placeat!
	</p>
</header>
<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Nom</h3>
	<section>
		<Field name="name" bind:value={editName} style="flex: 2; min-width: 250px" maxlength={NAME_MAX}>
			<svelte:fragment slot="label">Nom de l'organisation</svelte:fragment>
		</Field>
		<Field
			name="short_name"
			bind:value={editShortName}
			style="flex: 1; min-width: 250px"
			maxlength={SHORT_NAME_MAX}
		>
			<svelte:fragment slot="label">Nom court ou abbréviation</svelte:fragment>
		</Field>
	</section>
</fieldset>
<Dirty sample={data.organization.name} specimen={editName} bind:dirty={$editorDirtyValues.name} />
<Dirty
	sample={data.organization.short_name}
	specimen={editShortName}
	bind:dirty={$editorDirtyValues.shortName}
/>

<style lang="scss">
	section {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		width: 100%;
		flex-wrap: wrap;
		justify-content: stretch;
	}
</style>
