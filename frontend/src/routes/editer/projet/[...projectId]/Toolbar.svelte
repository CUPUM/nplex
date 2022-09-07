<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import type { ComponentProps } from 'svelte';

	export let hasDirty: boolean;

	const ttipPlacement: ComponentProps<Tooltip>['place'] = 'top';
	$: canPublish = ['admin', 'editor'].includes($page.data.session.user.role);
</script>

<aside>
	<menu class="general">
		<Tooltip message="Aide" place={ttipPlacement}>
			<Button square variant="ghost">
				<Icon size="1.25em" name="info-circle" />
			</Button>
		</Tooltip>
	</menu>
	<menu class="form-controls">
		<Tooltip
			message={$page.data.isNew ? 'Sauvegarder la nouvelle fiche' : 'Sauvegarder les modifications'}
			place={ttipPlacement}
		>
			<Button square type="submit" variant="ghost">
				<Icon size="1.25em" name={$page.data.isNew ? 'pen-plus' : 'save'} />
			</Button>
		</Tooltip>
		<Tooltip message="Annuler les modifications (revenir à l'état initial)" place={ttipPlacement}>
			<Button square type="reset" variant="ghost" disabled={!hasDirty}>
				<Icon size="1.25em" name="undo" />
			</Button>
		</Tooltip>
		<Tooltip message="Supprimer tout" place={ttipPlacement}>
			<Button square type="reset" variant="ghost">
				<Icon size="1.25em" name="trash" />
			</Button>
		</Tooltip>
		<!-- If editing existing sheet, aka routeId = /editer/[someId], if admin or editor, etc... -->
		<Tooltip
			message={canPublish ? 'Publier' : 'Soumettez votre fiche pour publication par un gestionnaire de contenu'}
			place={ttipPlacement}
		>
			<Button square type="submit" variant="ghost">
				<Icon size="1.25em" name="announcement" />
			</Button>
		</Tooltip>
	</menu>
</aside>

<!-- </div> -->
<style lang="scss">
	aside {
		grid-column: main;
		position: sticky;
		bottom: 2rem;
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		padding: 3px;
		border-radius: 1em;
		// background-color: rgba(var(--rgb-light-500), 0.5);
		background-color: rgba(255, 255, 255, 0.75);

		backdrop-filter: blur(8px);
		box-shadow: 0 0 0.5em 0 rgba(0, 0, 0, 0);
		transition: all 0.25s ease-in-out;

		&:hover {
			background-color: rgba(255, 255, 255, 0.9);
			box-shadow: 0 0.5em 2em -1.5em rgba(0, 0, 0, 0.5);
		}
	}

	menu {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: row;
		font-size: 1.1rem;
	}
</style>
