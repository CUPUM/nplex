<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let project: PageData['project'];

	let m = false;

	onMount(() => {
		m = true;
	});
</script>

{#if m}
	<menu in:fly={{ y: 20, easing: cubicOut, delay: 250, duration: 500 }}>
		<Button type="submit" variant="ghost">
			<Icon name={project.id ? 'pen' : 'pen-plus'} slot="leading" />
			{project.id ? 'Mettre à jour' : 'Sauvegarder la fiche'}
		</Button>
	</menu>
{/if}

<style lang="scss">
	menu {
		--pad: 5px;
		z-index: 1000;
		width: auto;
		margin: 2rem auto;
		display: flex;
		flex: none;
		background-color: col(bg, 000, 0.8);
		padding: var(--pad);
		border-radius: calc(var(--ui-radius) + var(--pad));
		bottom: 2rem;
		position: sticky;
		backdrop-filter: blur(8px);
	}
</style>
