<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldButtonReset from '$components/Field/FieldButtonReset.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import { projectsFiltersOpened, projectsListOpened } from './common';

	function toggleFiltersPane() {
		$projectsFiltersOpened = !$projectsFiltersOpened;
	}

	function toggleListPane() {
		$projectsListOpened = !$projectsListOpened;
	}
</script>

<section id="projects-toolbar">
	<form>
		<Field placeholder="Chercher des projets" variant="explorer" data-sveltekit-keepfocus={true}>
			<svelte:fragment slot="leading">
				<Button
					type="button"
					variant="default"
					on:click={toggleFiltersPane}
					active={$projectsFiltersOpened}
				>
					<Icon
						name={$projectsFiltersOpened ? 'cross' : 'filters'}
						slot="leading"
						strokeWidth={2.5}
					/>
					Filtres
				</Button>
				<FieldIcon name="search" />
			</svelte:fragment>
			<svelte:fragment slot="trailing">
				<FieldButtonReset />
				<Button equi type="submit"><Icon name="arrow-right" /></Button>
			</svelte:fragment>
		</Field>
	</form>
	<menu>
		<Button equi on:click={toggleListPane}>
			<Icon name="map" />
		</Button>
	</menu>
</section>

<style lang="scss">
	#projects-toolbar {
		// position: absolute;
		z-index: 1;
		font-size: var(--ui-text-sm);
		align-self: stretch;
		padding-inline: var(--ui-gutter-sm);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: var(--ui-gap-md);
		margin-bottom: var(--ui-gap-sm);
		pointer-events: none;

		> :global(*) {
			pointer-events: initial;
		}
	}

	form {
		flex: 1;
		max-width: var(--projects-filters-w);
	}
</style>
