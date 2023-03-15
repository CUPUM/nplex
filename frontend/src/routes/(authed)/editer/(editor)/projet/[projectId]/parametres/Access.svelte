<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import { debounce } from '$utils/modifiers';
	import { writable } from 'svelte/store';

	const searchUser = function () {
		const { subscribe, set } = writable<T>();
		let result;
		const query = debounce((q: string) => {});
		return {
			subscribe,
			set,
		};
	};
</script>

<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Accès</h3>
	<p class="info">
		Les droits d'accès aux fiches peuvent être partagés avec d'autres utilisateurs de Nplex. En
		ajoutant des collaborateurs au projet, ceux-ci se verront accorder les permissions nécessaires
		pour consulter la fiche même si elle n'est pas publiée. Il pourront aussi éditer le contenu de
		la fiche, mais ne pourront pas la supprimer.
	</p>
	<h4 class="heading-sm">Collaborateurs</h4>
	<p class="info">Pour ajouter des collaborateurs au projet,</p>
	<ul />
	<Field placeholder="Chercher un utilisateur..." bind:value={$searchUser.query}>
		<svelte:fragment slot="leading">
			<FieldIcon name="search" />
		</svelte:fragment>
	</Field>
</fieldset>

<style lang="scss">
</style>
