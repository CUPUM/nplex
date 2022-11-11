<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	type D = $$Generic<{ id: string | null; created_by_id: string | null }>;

	export let title: string;
	export let data: D[];

	const placeholder = {
		id: 'placeholder',
	};
	const filters = {
		all: 'Toutes',
		creator: 'Créées par moi',
		collaborator: 'Partagées avec moi',
	};
	let filter: keyof typeof filters = 'all';
	// let filtered: [...D[], typeof placeholder];
	$: filtered = [
		...data.filter((d) => {
			switch (filter) {
				case 'creator':
					return d.created_by_id === $page.data.session?.user.id;
				case 'collaborator':
					return d.created_by_id !== $page.data.session?.user.id;
				case 'all':
				default:
					return true;
			}
		}),
		placeholder,
	];
</script>

<section>
	<header>
		<h3>{title}</h3>
		<form action="" use:enhance>
			<Switch bind:group={filter} name="filter">
				{#each Object.entries(filters) as [k, v]}
					<SwitchItem value={k}>
						{v}
					</SwitchItem>
				{/each}
			</Switch>
		</form>
	</header>
	<ul class:empty={filtered.length === 1}>
		{#each filtered as datum, i (datum.id)}
			<li
				animate:flip={{ duration: (d) => d * 0.5, easing: expoOut, delay: i * 50 }}
				in:scale={{ start: 0.9, duration: 300, easing: cubicOut, delay: i * 50 }}
				out:scale|local={{ start: 0.8, duration: 200, delay: (filtered.length - i) * 50 }}
			>
				{#if 'created_by_id' in datum}
					<slot {datum} />
				{:else}
					<slot name="placeholder">Créer une nouvelle fiche (placeholder)</slot>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1rem;
	}

	h3 {
		all: unset;
		padding: 1rem;
		font-size: 2rem;
		font-weight: 500;
		color: var(--color-contrast-900);
	}

	form {
		all: unset;
	}

	ul {
		all: unset;
		position: relative;
		display: flex;
		flex-direction: row;
		gap: 3rem;
		padding: 4rem 2rem;
		overflow-x: scroll;
		&.empty {
		}
	}

	li {
		all: unset;
		position: relative;
		flex: 0;
	}
</style>
