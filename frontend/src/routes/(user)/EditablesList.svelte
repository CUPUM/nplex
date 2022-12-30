<script lang="ts" context="module">
	export const EDITABLES_NEW = {
		id: 'new',
	} as const;
</script>

<script lang="ts">
	import { autoHash } from '$actions/autoHash';
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
	export let id: string;

	const FILTERS = {
		all: 'Tous',
		creator: 'Créés par moi',
		collaborator: 'Partagés avec moi',
	} as const;

	let filter: keyof typeof FILTERS = 'all';
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
		EDITABLES_NEW,
	];
</script>

<section {id} use:autoHash>
	<header>
		<h3 class="e-h3">{title}</h3>
		<form action="" use:enhance method="POST">
			<Switch bind:group={filter} variant="outlined" name="filter" compact>
				{#each Object.entries(FILTERS) as [k, v]}
					<SwitchItem value={k}>
						{v}
					</SwitchItem>
				{/each}
			</Switch>
		</form>
	</header>
	<ul class:none={filtered.length === 1}>
		{#each filtered as datum, i (datum.id)}
			<li
				animate:flip={{ duration: (d) => d * 0.5, easing: expoOut, delay: i * 50 }}
				in:scale={{ start: 0.9, duration: 300, easing: cubicOut, delay: i * 50 }}
				out:scale|local={{ start: 0.8, duration: 200, delay: (filtered.length - i) * 50 }}
			>
				<slot {datum} />
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		display: flex;
		width: 100%;
		flex-direction: column;
		scroll-margin-top: var(--ui-nav-px);
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		gap: 1rem;
		padding: var(--ui-gutter);
		max-width: var(--ui-width-main);
		width: 100%;
		margin: 0 auto;
	}

	h3 {
		font-size: var(--ui-text-xl);
		font-weight: 600;
		padding-inline: var(--ui-gutter);
	}

	form {
		margin-bottom: 0.6em;
		font-size: var(--ui-text-sm);
	}

	ul {
		--scroll-color: transparent;
		--scroll-size: 0;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		overflow-x: scroll;
		padding-block: 0;
		padding-inline: max(
			var(--ui-gutter),
			calc(50vw + var(--ui-gutter) - 0.5 * var(--ui-width-main))
		);
	}

	li {
		flex: 0;
	}
</style>
