<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import ProjectsList from '$routes/editer/ProjectsList.svelte';
	import type { LayoutData } from './$types';
	import Search from './Search.svelte';

	const targetForm = 'edit-form';

	export let data: LayoutData;
</script>

<div>
	<article>
		<div class="aside-wrapper">
			<aside>
				<menu class="general">
					<Tooltip message="Aide" place="right">
						<Button square variant="ghost">
							<Icon size="1.25em" name="info-circle" />
						</Button>
					</Tooltip>
				</menu>
				<menu class="form-controls">
					<Tooltip message="Enregistrer" place="right">
						<Button square form={targetForm} type="submit" variant="ghost">
							<Icon size="1.25em" name="pen-plus" />
						</Button>
					</Tooltip>
					<Tooltip message="Effacer tout" place="right">
						<Button square form={targetForm} type="reset" variant="ghost">
							<Icon size="1.25em" name="trash" />
						</Button>
					</Tooltip>
					<!-- If editing existing sheet, aka routeId = /editer/[someId], if admin or editor, etc... -->
					<Tooltip message="Publier la fiche" place="right">
						<Button form={targetForm} square type="submit" variant="ghost">
							<Icon size="1.25em" name="upload" />
						</Button>
					</Tooltip>
					<!-- Add category-specific controls -->
				</menu>
			</aside>
		</div>
		<section>
			<slot />
		</section>
	</article>
	<Search />
	<ProjectsList />
	<!-- Other lists here -->
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0;
	}

	article {
		position: relative;
		display: flex;
		flex-direction: row;
	}

	section {
		width: 100%;
	}

	.aside-wrapper {
		z-index: 1;
		position: sticky;
		top: 50%;
		transform: translateY(-50%);
		// bottom: 0px;
		// align-self: flex-end;
		align-self: center;
		width: 0px;
	}

	aside {
		position: relative;
		pointer-events: all;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0.5rem;
		margin-left: 1rem;
		width: fit-content;
		padding: 3px;
		border-radius: 1em;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
	}

	menu {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		font-size: 1.2em;
	}
</style>
