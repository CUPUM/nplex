<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let project: PageData['project'];
	export let dirty: boolean = true;

	let mount = false;

	onMount(() => {
		mount = true;
	});
</script>

{#if mount}
	<menu class="nest" in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}>
		<Tooltip message={project.id ? 'Mettre à jour' : 'Sauvegarder'}>
			<Button type="submit" variant="ghost" equi>
				<Icon name={project.id ? 'pen' : 'pen-plus'} />
			</Button>
		</Tooltip>
		{#if dirty}
			<Tooltip message="Annuler les modifications">
				<Button type="submit" formaction="?/refresh" variant="ghost" equi>
					<Icon name="undo" />
				</Button>
			</Tooltip>
		{/if}
		<!-- <Tooltip message="Supprimer">
			<Button type="submit" formaction="?/delete" variant="ghost" warning equi>
				<Icon name="trash" />
			</Button>
		</Tooltip> -->
	</menu>
{/if}

<style lang="scss">
	menu {
		--inset: var(--ui-inset);
		font-size: var(--size-medium);
		z-index: 1000;
		width: auto;
		margin: 2rem 0;
		display: flex;
		flex: none;
		background-color: col(bg, 000, 0.8);
		padding: var(--inset);
		border-radius: var(--ui-radius);
		bottom: 2rem;
		position: sticky;
		backdrop-filter: blur(8px);
	}
</style>
