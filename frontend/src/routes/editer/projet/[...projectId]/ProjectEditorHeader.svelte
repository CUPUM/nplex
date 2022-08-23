<script lang="ts" context="module">
</script>

<script lang="ts">
	import { reveal } from '$actions/reveal';
	import { slipMask } from '$utils/presets/reveal';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<header class:mounted>
	<hgroup>
		{#if data.isNew}
			<h2 use:reveal={{ ...slipMask, splitDelimiter: /(.{3})/, rootMargin: '0px 0px' }}>
				Nouvelle fiche de projet
			</h2>
		{:else}
			<h2 use:reveal={{ ...slipMask, rootMargin: '0px 0px' }}>Fiche du projet: {data.project.title}</h2>
		{/if}
	</hgroup>
	<section>
		<div>Créée le&nbsp;:<br />{new Date(+data.project.created_at).toLocaleString()}</div>
		<div>Modifiée le&nbsp;:<br />{new Date(+data.project.updated_at).toLocaleString()}</div>
	</section>
</header>

<style lang="scss">
	header {
		position: relative;
		color: var(--color-dark-700);
		grid-column: full;
		background-color: var(--color-light-900);
		margin-top: calc(-1 * var(--navbar-height));
		min-height: 80vh;
		padding: 6rem 0;
		@include mixins.core-grid;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		z-index: -20;

		&::after {
			content: '';
			position: absolute;
			width: 120%;
			height: 300px;
			bottom: 0;
			left: -10%;
			filter: blur(16px);
			opacity: 0.1;
			background: linear-gradient(0deg, var(--color-dark-100), transparent);
		}
	}

	hgroup {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		grid-column: col1 / col2;
		grid-row: 1;
		align-items: flex-start;
		padding-right: 4rem;
	}

	h2 {
		padding: 0;
		margin: 0;
		font-weight: 600;
		grid-column: col1 / col2;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		grid-column: col3;
		grid-row: 2;
		gap: 1em;
		font-size: 0.8em;
		font-weight: 400;
		letter-spacing: 1px;
	}

	div {
		opacity: 0;
		transform: translateY(0.5em);
		transition: all 1.5s cubic-bezier(0.1, 0, 0, 1);
		transition-delay: 0.25s;

		&:nth-child(2) {
			transition-delay: 0.5s;
		}
	}

	.mounted div {
		opacity: 1;
		transform: translateY(0);
	}
</style>
