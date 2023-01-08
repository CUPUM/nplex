<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { fly } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let title = '';
</script>

<form
	id="create"
	method="POST"
	action="?/create"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<div>
		<h1 in:fly={{ y: 20 }}>Créez votre nouveau projet</h1>
		<fieldset in:fly={{ y: -20, delay: 150 }}>
			<Tooltip
				place="bottom"
				message="Vous pourrez toujours modifier le titre une fois le projet créé."
			>
				<Field
					name="title"
					class="title"
					placeholder="Donnez un titre à vorte projet"
					variant="outlined"
					bind:value={title}
					invalid={Boolean(form?.title?.length)}
				>
					<svelte:fragment slot="trailing">
						<Button type="submit" disabled={!title}>
							Créer
							<Icon slot="leading" name="plus" />
						</Button>
					</svelte:fragment>
				</Field>
			</Tooltip>
		</fieldset>
	</div>
</form>

<style lang="scss">
	form {
		--radius: min(var(--ui-radius-xl), calc(var(--ui-scroll-px) * 0.2));
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-px));
		padding-bottom: var(--ui-nav-px);
		margin: 0 auto;
		border: 1px solid col(fg, 900, min(0.1, calc(var(--ui-scroll) * 0.001)));
		border-top: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
	}

	div {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-inline: var(--ui-gutter);
		max-width: var(--ui-width-md);
		width: 100%;
		gap: 1rem;
	}

	h1 {
		width: 100%;
		font-size: var(--ui-text-2xl);
		font-weight: 600;
		max-width: var(--ui-width-p);
		text-align: center;
		margin-bottom: 4rem;
	}

	section {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1em;
		opacity: 0.2;
	}

	fieldset {
		width: 100%;
		font-size: 1.25rem;
	}
</style>
