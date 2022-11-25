<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<header>
	<h1>Éditer</h1>
</header>
<form
	id="edit"
	method="POST"
	action="?/upsert"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<fieldset>
		<Field name="title" bind:value={data.project.title}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
	</fieldset>
	<fieldset>
		<h3>Type de projet</h3>
		{#each data.descriptors.types as d}
			<label>
				{d.title}
				<input
					type="radio"
					name="type_id"
					bind:group={data.project.type_id}
					value={d.id}
					id=""
				/>
			</label>
		{/each}
	</fieldset>
	<fieldset>
		<h3>Travaux</h3>
		{#if data.project.type_id}
			{#each data.descriptors.works.filter((w) => data.project.type_id && w.type_ids.includes(data.project.type_id)) as w (w.id)}
				<label>
					{w.id}
					<input
						type="checkbox"
						name="work_id"
						bind:value={data.project.work_ids}
						id=""
					/>
				</label>
			{/each}
		{/if}
	</fieldset>
</form>

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		max-width: var(--ui-size-xl);
		padding: 2rem;
		margin: 0 auto;
		align-items: flex-start;
	}

	fieldset {
		padding: 2rem 0;
	}
</style>
