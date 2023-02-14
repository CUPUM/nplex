<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Superficie du terrain</legend>
	<section class="formfields">
		<div class="area">
			<Field
				style="flex: 1;"
				type="number"
				suffix="m²"
				min={0}
				placeholder="Définissez la superficie du site"
			/>
			<Button>Synchroniser avec la carte</Button>
		</div>
		<Button>Dessiner</Button>
		<p class="forminfo">
			Vous pouvez utiliser l'outil de mesure <Icon name="path-line" /> d'aire disponible sur la carte
			pour vous aider à évaluer. Notez que les tracés produits avec cet outil ne sont pas sauvegardés.
		</p>
	</section>
</fieldset>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: flex-start;
	}

	.area {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-self: stretch;
		width: 100%;
	}
</style>
