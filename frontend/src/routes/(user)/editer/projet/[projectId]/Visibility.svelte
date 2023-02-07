<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
</script>

<fieldset>
	<legend>Visibilité et paramètres d'accès</legend>
	<section>
		<Button>
			<Icon name="trash" slot="leading" />
			Supprimer le projet
		</Button>
	</section>
</fieldset>

<style lang="scss">
</style>
