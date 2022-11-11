<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { PageData } from './$types';

	export let project: PageData['project'];
</script>

<menu>
	<Tooltip message={project ? 'Mettre à jour' : 'Créer'}>
		<Button equi type="submit">
			<Icon name={project ? 'pen' : 'pen-plus'} />
		</Button>
	</Tooltip>
</menu>

<style lang="scss">
	menu {
		--pad: 5px;
		z-index: 1000;
		width: auto;
		margin: 2rem auto;
		display: flex;
		flex: none;
		background-color: col(bg, 000, 0.5);
		padding: var(--pad);
		border-radius: calc(var(--ui-radius) + var(--pad));
		bottom: 2rem;
		position: sticky;
		backdrop-filter: blur(8px);
	}
</style>
