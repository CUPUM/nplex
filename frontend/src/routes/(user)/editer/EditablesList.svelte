<script lang="ts" context="module">
	type DatumBase = { id: string | null; created_by_id: string | null; published: boolean };

	type FilterFunction = <T extends DatumBase>(d: T) => boolean;
	type AuthoringFilterFunction = <T extends DatumBase>(d: T, uid: string) => boolean;

	type Filters<F> = Record<string, { text: string; filter: F }>;

	const EDITABLES_NEW = {
		id: 'new',
	} as const;

	const AUTHORING_FILTERS = {
		all: {
			text: 'Tous',
			filter: (d, uid) => true,
		},
		mine: {
			text: 'Créés par moi',
			filter: (d, uid) => {
				return d.created_by_id === uid;
			},
		},
		shared: {
			text: 'Partagés avec moi',
			filter: (d, uid) => {
				return d.created_by_id !== uid;
			},
		},
	} satisfies Filters<AuthoringFilterFunction>;

	const PUBLICATION_FILTERS = {
		all: {
			text: 'Tous',
			filter: (d) => true,
		},
		draft: {
			text: 'Brouillons',
			filter: (d) => {
				return !d.published;
			},
		},
		published: {
			text: 'Publiés',
			filter: (d) => {
				return d.published;
			},
		},
	} satisfies Filters<FilterFunction>;

	type PersistedFilters = {
		authoring: keyof typeof AUTHORING_FILTERS;
		publication: keyof typeof PUBLICATION_FILTERS;
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import { getPersistedValue, persistValue } from '$utils/persist';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	type D = $$Generic<DatumBase>;

	export let title: string;
	export let data: D[];
	export let id: string;

	const storageKey = `editables-filter-${id}`;
	let applied = getPersistedValue<PersistedFilters>(storageKey, {
		authoring: 'all',
		publication: 'all',
	});
	$: persistValue(storageKey, applied);
	$: filtered = [
		...data.filter(
			(d) =>
				AUTHORING_FILTERS[applied.authoring].filter(d, $page.data.session?.user.id!) &&
				PUBLICATION_FILTERS[applied.publication].filter(d)
		),
		EDITABLES_NEW,
	];
</script>

<section {id}>
	<header>
		<h3 class="e-h3">{title}</h3>
		<form action="" use:enhance method="POST">
			<Switch bind:group={applied.authoring} variant="colored" name="filter" compact>
				{#each Object.entries(AUTHORING_FILTERS) as [k, v]}
					<SwitchItem value={k}>
						{v.text}
					</SwitchItem>
				{/each}
			</Switch>
			<Switch bind:group={applied.publication} variant="colored" name="filter" compact>
				{#each Object.entries(PUBLICATION_FILTERS) as [k, v]}
					<SwitchItem value={k}>
						{v.text}
					</SwitchItem>
				{/each}
			</Switch>
			<!-- {#each FILTER_KEYS as f}
				<label class:applied={applied.includes(f)}>
					{FILTERS[f].text}
					<input type="checkbox" hidden value={f} bind:group={applied} />
				</label>
			{/each} -->
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
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		gap: 0.5em;

		label {
			user-select: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			padding-block: 0.25em 0.5em;
			padding-inline: 1.25em;
			border-radius: 99px;
			border: 1px solid col(fg, 500, 0.1);
			transition: all 0.2s var(--ui-ease-out);

			&:hover:not(.applied) {
				color: col(primary, 500);
				border: 1px solid col(primary, 500, 0.2);
			}
		}

		.applied {
			color: col(primary, 700);
			background: col(primary, 100, 0.2);
			border: 1px solid transparent;

			&:hover {
			}
		}
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
