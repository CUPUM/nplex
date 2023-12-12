<script context="module" lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { AnyZodObject } from 'zod';
	import DashboardDescriptorForm from './DashboardDescriptorForm.svelte';

	export let ordered: boolean = false;
	export let data: SuperValidated<T>[];
	export let key: (datum: SuperValidated<T>) => unknown;
</script>

<svelte:element this={ordered ? 'ol' : 'ul'} class="list">
	{#each data as datum, i (key(datum))}
		<li>
			<DashboardDescriptorForm {datum}>
				<slot name="trigger" slot="trigger" {datum} {i} />
				<slot name="form" slot="form" {datum} {i} />
			</DashboardDescriptorForm>
		</li>
	{/each}
</svelte:element>

<style lang="postcss">
	.list {
		grid-column: full;
		position: relative;
		display: flex;
		flex-direction: row;
		align-self: center;
		max-width: var(--width-md);
		padding: 1rem;
		gap: 1rem;
		flex-wrap: wrap;
		max-width: var(--width-md);
		width: 100%;

		@container (width > 1200px) {
			margin-right: var(--dashboard-navbar);
		}
	}
</style>
