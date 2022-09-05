<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import type { ComponentProps } from 'svelte';

	const ttipPlacement: ComponentProps<Tooltip>['place'] = 'top';
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
		<Tooltip message="Revenir à l'état initial" place={ttipPlacement}>
			<Button square type="reset" variant="ghost">
				<Icon size="1.25em" name="trash" />
			</Button>
		</Tooltip>
		<Tooltip message="Supprimer tout" place={ttipPlacement}>
			<Button square type="reset" variant="ghost">
				<Icon size="1.25em" name="trash" />
			</Button>
		</Tooltip>
		<!-- If editing existing sheet, aka routeId = /editer/[someId], if admin or editor, etc... -->
		<Tooltip message="Publier" place={ttipPlacement}>
			<Button square type="submit" variant="ghost">
				<Icon size="1.25em" name="upload" />
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
		font-size: 1em;
	}
</style>
