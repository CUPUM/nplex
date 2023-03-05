<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
</script>

<EditorFormgroup legend="Superficie du terrain">
	<p class="ui-info">
		Vous pouvez utiliser l'outil de mesure <kbd><Icon name="path-line" /></kbd>
		disponible sur la carte pour vous aider à évaluer l'aire.
	</p>
	<p class="ui-info">Notez que les tracés produits avec cet outil ne sont pas sauvegardés.</p>

	<Field
		style="flex: 1;"
		type="number"
		suffix="&ensp;m²"
		min={0}
		placeholder="Définissez la superficie du site"
		textAlign="end"
	>
		<svelte:fragment slot="leading">
			<Tooltip message="Synchroniser avec la carte.">
				<Button equi><Icon name="link" /></Button>
			</Tooltip>
		</svelte:fragment>
	</Field>
</EditorFormgroup>

<style lang="scss">
	.area {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		align-self: stretch;
		width: 100%;
	}
</style>
