<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { fade, fly } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let creating = false;
	let title = '';

	$: if (form?.error) {
		messages.error(...[form.error].flat());
	}
	$: if (form?.title) {
		messages.error({ content: form.title.join(' ') });
	}
</script>

<form
	id="create"
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
		<h2 class="h2" in:fly={{ y: 12 }}>
			Créez votre <nobr>nouveau projet.</nobr>
		</h2>
		<fieldset in:fly={{ y: -12, delay: 150 }}>
			<Field
				name="title"
				class="title"
				variant="outlined"
				bind:value={title}
				invalid={!!form?.title}
				placeholder="Titre de projet"
			>
				<!-- <svelte:fragment slot="label">Titre du projet</svelte:fragment> -->
				<Button
					slot="trailing"
					type="submit"
					variant="ghost"
					equi
					disabled={!title}
					loading={creating}
				>
					<Icon name="arrow-right" />
				</Button>
			</Field>
			<span class="ui-info" in:fade={{ delay: 500 }}>
				<Icon name="info-circle" style="margin-right: .5em; top: -.1em" /> Vous pourrez toujours modifier
				ce titre une fois le projet créé.
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
		width: 100%;
		align-items: center;
		text-align: center;
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
