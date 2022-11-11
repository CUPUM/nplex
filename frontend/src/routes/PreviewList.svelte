<script lang="ts" context="module">
</script>

<script lang="ts">
	import { reveal, slipMask } from '$actions/reveal';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';

	type D = $$Generic<{ id: string | null }>;

	export let header: string;
	export let href: string;
	export let data: D[];
</script>

<section>
	<a {href} class="hover-source">
		<h2 use:reveal={{ ...slipMask, stagger: 25, delimiter: '' }}>{header}</h2>
		<div class="button-wrapper">
			<Button class="hover-target" variant="ghost">
				Explorer plus
				<Icon name="arrow-right" slot="trailing" />
			</Button>
		</div>
	</a>
	<ul>
		{#each data as datum (datum.id)}
			<li>
				<slot {datum} />
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgb(var(--rgb-contrast-100), 0.1);
	}

	a {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 1rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		color: var(--color-contrast-900);
		transition: all 0.15s ease-in-out;
		@include tablet {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		&:hover {
			color: var(--color-primary-500);
			// background: rgb(var(--rgb-primary-100), 0.1);
		}
	}

	h2 {
		all: unset;
		grid-column: 2;
		font-size: 4rem;
		font-weight: 500;
		padding-bottom: 0.25em;
	}

	.button-wrapper {
		grid-column: 3;
		display: flex;
		align-items: center;
		justify-self: flex-end;
	}

	ul {
		all: unset;
		position: relative;
		overflow-x: scroll;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		padding: 2rem max(calc(50% - 400px), 2rem);
		padding-bottom: 6rem;
		--scroll-color: transparent;
	}

	li {
		all: unset;
		display: block;
	}
</style>
