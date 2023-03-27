<script lang="ts" context="module">
	type DatumBase = {
		id: string | null;
		created_by: string | null;
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
				return d.created_by === uid;
			},
		},
		shared: {
			text: 'Partagés avec moi',
			filter: (d, uid) => {
				return d.created_by !== uid;
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
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	type D = $$Generic<DatumBase>;

	export let title: string;
	export let data: Promise<D[]>;
	export let id: string;
	export let filters: PersistedFilters;

	let filtered: (D | typeof defaultDatum)[] = [];

	$: data.then((d) => {
		filtered = [
			...d.filter(
				(d) =>
					authoring[filters.authoring].filter(d, $page.data.session?.user.id!) &&
					publishing[filters.publishing].filter(d)
			),
			defaultDatum,
		];
	});
</script>

<section {id}>
	<header>
		<h3 class="heading-lg">{title}</h3>
		<form action="" use:enhance method="POST">
			<Switch bind:value={filters.authoring} variant="feature" name="filter" compact>
				{#each Object.entries(authoring) as [k, v]}
					<SwitchItem value={k}>
						{v.text}
					</SwitchItem>
				{/each}
			</Switch>
			<Switch bind:value={filters.publishing} variant="feature" name="filter" compact>
				{#each Object.entries(publishing) as [k, v]}
					<SwitchItem value={k}>
						{v.text}
					</SwitchItem>
				{/each}
			</Switch>
		</form>
	</header>
	<ul class:none={filtered.length === 1} class="noscrollbar">
		{#each filtered as datum, i (datum.id)}
			<li
				animate:flip={{ duration: (d) => d * 0.5, easing: expoOut, delay: i * 50 }}
				in:fly={{ y: 8, duration: 300, easing: cubicOut, delay: i * 100 }}
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
		padding-inline: var(--ui-gutter-md);
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
	}

	ul {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		overflow-x: scroll;
		padding-block: var(--ui-gutter-md);
		padding-inline: max(
			var(--ui-gutter-md),
			calc(50% + var(--ui-gutter-md) - 0.5 * var(--ui-width-main))
		);
	}

	li {
		position: relative;
		flex: none;
	}
</style>
