<script lang="ts">
	import { Dialog } from '$lib/builders/dialog.svelte';
	import DialogBox from '$lib/components/primitives/dialog-box.svelte';
	import { Search } from 'lucide-svelte';

	const dialog = new Dialog();
</script>

<button class="button button-dashed" type="button" {...dialog.triggerAttributes}>
	Ajouter un collaborateur
</button>

<DialogBox {dialog}>
	{#snippet title()}
		Ajouter un collaborateur
	{/snippet}
	<form action="">
		Rechercher
		<div class="input-group">
			<Search />
			<input type="search" class="input" />
			<div class="input-peer">
				<button class="button">Chercher</button>
			</div>
		</div>
		<fieldset>Description de la contribution</fieldset>
		<fieldset>Permissions d'édition</fieldset>
	</form>
</DialogBox>
