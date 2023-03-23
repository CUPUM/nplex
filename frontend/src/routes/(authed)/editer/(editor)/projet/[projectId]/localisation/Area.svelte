<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';

	const ttip = 'Synchroniser avec le dessin sélectionné sur la carte.';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Superficies</h3>
	<p>Établissez les diverses superficies qui caractérisent le projet.</p>
	<div id="project-areas-info">
		<kbd><Icon name="path-line" /></kbd>

		<p>
			Vous pouvez utiliser l'outil de mesure disponible sur la carte pour vous aider à évaluer
			l'aire. Cherchez ce bouton dans la palette d'outils de la carte. Notez que les tracés produits
			avec cet outil ne sont pas sauvegardés.
		</p>
	</div>
	<div id="project-areas">
		<Field variant="outlined" type="number" suffix="&ensp;m²" min={0} textAlign="end">
			<svelte:fragment slot="leading">
				<Tooltip message={ttip}>
					<Button equi><Icon name="refresh" /></Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Aire du site</svelte:fragment>
		</Field>
		<Field variant="outlined" type="number" suffix="&ensp;m²" min={0} textAlign="end">
			<svelte:fragment slot="leading">
				<Tooltip message={ttip}>
					<Button equi><Icon name="refresh" /></Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Aire du bâtiment</svelte:fragment>
		</Field>
		<Field variant="outlined" type="number" suffix="&ensp;m²" min={0} textAlign="end">
			<svelte:fragment slot="leading">
				<Tooltip message={ttip}>
					<Button equi><Icon name="refresh" /></Button>
				</Tooltip>
			</svelte:fragment>
			<svelte:fragment slot="label">Surface des travaux</svelte:fragment>
		</Field>
	</div>
</fieldset>

<style lang="scss">
	#project-areas-info {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-items: flex-start;
		opacity: 0.5;

		p {
			margin: 0;
		}
	}

	#project-areas {
		max-width: 250px;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: stretch;
		width: 100%;
		margin-top: 3rem;
	}
</style>
