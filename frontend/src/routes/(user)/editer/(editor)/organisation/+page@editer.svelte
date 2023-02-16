<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import { fade, fly } from 'svelte/transition';

	let creating = false;
	let name: string;
</script>

<form
	method="POST"
	action="?/create"
	use:enhance={({ form, data, action, cancel }) => {
		creating = true;
		return async ({ update, result }) => {
			update({ reset: false });
			if (result.type !== 'success' && result.type !== 'redirect') {
				creating = false;
			}
		};
	}}
>
	<div>
		<h2 in:fly={{ y: 12 }}>Créez une nouvelle organisation.</h2>
		<fieldset>
			<Field
				name="name"
				variant="outlined"
				placeholder="Nom d'organisation ou de bureau"
				bind:value={name}
			>
				<!-- <svelte:fragment slot="label">Nom de l'organisation ou du bureau</svelte:fragment> -->
				<Button
					type="submit"
					equi
					slot="trailing"
					variant="ghost"
					disabled={!name}
					loading={creating}
				>
					<Icon name="arrow-right" />
				</Button>
			</Field>
			<span class="ui-info" in:fade={{ delay: 500 }}>
				<Icon name="info-circle" style="margin-right: .5em; top: -.1em" /> Vous pourrez toujours modifier
				ce nom par après.
			</span>
		</fieldset>
	</div>
</form>

<style lang="scss">
	form {
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
		padding-bottom: var(--ui-nav-h);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		max-width: var(--ui-width-sm);
		text-align: center;
		width: 100%;
		align-items: center;
	}

	fieldset {
		width: 100%;
	}

	span {
		text-align: center;
		display: inline-block;
		width: 100%;
		margin-top: 2rem;
	}
</style>
