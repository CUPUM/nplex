<script lang="ts" context="module">
	type DatumBase = {
		id: string | null;
		created_by_id: string | null;
		publication_status?: Pick<
			App.Database['public']['Tables']['projects_publication_status']['Row'],
			'status'
		> | null;
	};
	type FilterFunction = <T extends DatumBase>(d: T) => boolean;
	type AuthoringFilterFunction = <T extends DatumBase>(d: T, uid: string) => boolean;
	type Filters<F> = Record<string, { text: string; filter: F }>;

	const defaultDatum = {
		id: 'new',
	} as const;
	export type EditablesDefault = typeof defaultDatum;

	const authoring = {
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

	const publishing = {
		all: {
			text: 'Tous',
			filter: (d) => true,
		},
		draft: {
			text: 'Brouillons',
			filter: (d) => {
				return d.publication_status?.status !== 'published';
			},
		},
		published: {
			text: 'Publiés',
			filter: (d) => {
				return d.publication_status?.status === 'published';
			},
		},
	} satisfies Filters<FilterFunction>;

	type PersistedFilters = {
		authoring: keyof typeof authoring;
		publishing: keyof typeof publishing;
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { getPersistedValue, persistValue } from '$utils/persist';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	type D = $$Generic<DatumBase>;

	export let title: string;
	export let data: D[];
	export let id: string;

	const storageKey = `editables-filter-${id}`;
	let applied = getPersistedValue<PersistedFilters>(storageKey, {
		authoring: 'all',
		publishing: 'all',
	});
	$: persistValue(storageKey, applied);
	$: filtered = [
		...data.filter(
			(d) =>
				authoring[applied.authoring].filter(d, $page.data.session?.user.id!) &&
				publishing[applied.publishing].filter(d)
		),
		defaultDatum,
	];
</script>

<section {id}>
	<header>
		<h3 class="h2">{title}</h3>
		<form action="" use:enhance method="POST">
			<Switch bind:group={applied.authoring} variant="colored" name="filter" compact>
				{#each Object.entries(authoring) as [k, v]}
					<SwitchItem value={k}>
						{v.text}
					</SwitchItem>
				{/each}
			</Switch>
			<Switch bind:group={applied.publishing} variant="colored" name="filter" compact>
				{#each Object.entries(publishing) as [k, v]}
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
	<ul class:none={filtered.length === 1} class="no-scrollbar">
		{#each filtered as datum, i (datum.id)}
			<li
				animate:flip={{ duration: (d) => d * 0.5, easing: expoOut, delay: i * 50 }}
				in:fly={{ y: 8, duration: 300, easing: cubicOut, delay: i * 50 }}
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
		scroll-margin-top: var(--ui-nav-h);
		margin-top: var(--ui-nav-h);
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.5rem;
		padding-top: 0.5rem;
		max-width: var(--ui-width-main);
		width: 100%;
		margin: 0 auto;

		@include laptop {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	form {
		margin-bottom: 0.4em;
		font-size: var(--ui-text-sm);
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 1em;

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
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		overflow-x: scroll;
		padding-block: 0;
		padding-inline: max(1.5rem, calc(50% + 1.5rem - 0.5 * var(--ui-width-main)));
	}

	li {
		flex: 0;

		/**
		 * New entry card, inherits from local a tag.
		 */
		:global(.new-entry) {
			display: flex;
			flex-direction: column;
			padding: 1.5rem;
			gap: 1rem;
			align-items: center;
			justify-content: center;
			background: transparent;
			color: col(fg, 100);
			border: 1px dashed col(fg, 100, 0.2);
			transition: all 0.2s;
			& > :global(*) {
				opacity: 0.5;
				transition: opacity 0.5s;
			}
			&:hover {
				color: col(fg, 500);
				border: 1px dashed transparent;
				background: col(fg, 100, 0.1);
				& > :global(*) {
					opacity: 1;
				}
			}
			:global(span) {
				text-align: center;
				font-weight: 400;
			}
			:global(i) {
				font-size: 2rem;
			}
		}
	}
</style>
