<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
</script>

<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Supprimer</h3>
	<p class="info">Attention, les projets supprimés ne peuvent pas être récupérés.</p>
	<fieldset class="delete">
		<Button variant="danger" type="submit" formaction="?/delete">
			<Icon name="trash" slot="leading" />Supprimer le projet
		</Button>
	</fieldset>
</fieldset>

<style lang="scss">
</style>
