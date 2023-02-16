<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
</script>

<section class="editor-section">
	<h3 class="legend">Superficie du terrain</h3>
	<p class="ui-info">
		Vous pouvez utiliser l'outil de mesure <kbd><Icon name="path-line" /></kbd>
		d'aire disponible sur la carte pour vous aider à évaluer. Notez que les tracés produits avec cet
		outil ne sont pas sauvegardés.
	</p>
	<Field
		style="flex: 1;"
		type="number"
		suffix="m²"
		min={0}
		placeholder="Définissez la superficie du site"
	/>
	<Button>Synchroniser avec la carte</Button>
	<Button>Dessiner</Button>
</section>

<style lang="scss">
	.area {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-self: stretch;
		width: 100%;
	}

	p {
		max-width: var(--ui-width-sm);
	}
</style>
