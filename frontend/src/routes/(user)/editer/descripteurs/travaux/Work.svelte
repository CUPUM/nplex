<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import type { PageData } from './$types';

	export let id: number;
	export let title: string;
	export let description: string | null;
	export let types_ids: number[];
	export let types: PageData['descriptors']['types'];

	let opened = false;
	let dirty = false;
	let loading = false;

	$: _title = title;
	$: _description = description;
	$: _types_ids = [...types_ids];

	$: if (description) console.log(description);

	$: dirty = _title !== title;
	$: dirty = _description !== description;
	$: dirty =
		_types_ids.length !== types_ids.length || _types_ids.some((tid) => types_ids.indexOf(tid) < 0);
</script>

<form
	action="?/update"
	method="POST"
	use:enhance={({ form, data, action, cancel }) => {
		loading = true;
		return async ({ update, result }) => {
			update({ reset: false });
			loading = false;
		};
	}}
>
	<input type="hidden" readonly name="id" value={id} />
	<Field name="title" placeholder="Titre" bind:value={_title} />
	<!-- <Button equi><Icon name="comment" /></Button> -->
	<Field name="description" placeholder="Courte description" bind:value={_description} />
	<fieldset>
		{#each types as type}
			{@const inputid = `work-${id}-type-${type.id}`}
			<input
				id={inputid}
				hidden
				type="checkbox"
				name="types_ids"
				value={type.id}
				bind:group={_types_ids}
			/>
			<label for={inputid}>
				<Ripple />
				<span class="inner">{type.title}</span>
			</label>
		{/each}
	</fieldset>
	<menu>
		<Button type="submit" equi disabled={!dirty} variant="cta">
			<Icon name="save" />
		</Button>
		<Button type="submit" formaction="?/delete" equi variant="ghost"><Icon name="cross" /></Button>
	</menu>
</form>

<style lang="scss">
	form {
		font-size: var(--ui-text-sm);
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 1fr auto auto;
		padding: 1rem;
		border-radius: var(--ui-radius-md);
		gap: 0.5em;
		transition: all 0.15s ease-out;

		&:hover {
			background: col(bg, 000);
		}
	}

	fieldset {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25em;
		height: 100%;
		// padding-inline: 0.45em;
		border-radius: 99px;
		// background: col(fg, 500, 0.05);
	}

	label {
		user-select: none;
		position: relative;
		cursor: pointer;
		flex: none;
		padding-inline: 1em;
		height: 2.8em;
		border-radius: 99px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: col(fg, 100);
		background: col(fg, 500, 0.05);
		transition: all 0.2s ease-out;

		&:hover {
			color: col(primary, 700);
			background: col(primary, 300, 0.2);
		}

		input[type='checkbox']:checked:checked + & {
			color: col(primary, 900);
			background: col(primary, 100);
		}
	}

	.inner {
		position: relative;
		top: -0.1em;
	}
</style>
