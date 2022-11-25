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

	interface $$Slots {
		default: {
			datum: D;
		};
		placeholder: {};
	}

	type D = $$Generic<{ id: string | null; created_by_id: string | null }>;

	export let title: string;
	export let data: D[];

	const filters = {
		all: 'Tous',
		creator: 'Créés par moi',
		collaborator: 'Partagés avec moi',
	};
	const placeholder = {
		id: 'placeholder',
	};

	let filter: keyof typeof filters = 'all';
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
		<h3 class="e-h3">{title}</h3>
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
	<ul class:none={filtered.length === 1}>
		{#each filtered as datum, i (datum.id)}
			<li
				animate:flip={{ duration: (d) => d * 0.5, easing: expoOut, delay: i * 50 }}
				in:scale={{ start: 0.9, duration: 300, easing: cubicOut, delay: i * 50 }}
				out:scale|local={{ start: 0.8, duration: 200, delay: (filtered.length - i) * 50 }}
			>
				{#if !('created_by_id' in datum)}
					<slot name="placeholder" />
				{:else}
					<slot {datum} />
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
		flex-direction: column;
		gap: 0;
		padding: 2rem 0;
		padding-bottom: 0;
		max-width: var(--ui-display-large);
		width: 100%;
		margin: 0 auto;
		padding: 0 2rem;
	}

	h3 {
		padding: var(--ui-size-x2small) 0;
	}

	form {
		font-size: var(--ui-size-xsmall);
	}

	ul {
		--scroll-color: transparent;
		display: flex;
		flex-direction: row;
		gap: 0;
		overflow-x: scroll;
		padding: 0 2rem;
	}

	li {
		flex: 0;
	}
</style>
