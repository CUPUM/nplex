<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
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
		<h1>Créez votre nouveau projet</h1>
		<Field
			name="title"
			class="title"
			placeholder="Titre"
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
		<section>
			<Icon name="info-circle" />
			<p>
				Pour débuter, donnez un titre à vorte projet. Ce titre pourra être modifié ultérieurement.
			</p>
		</section>
	</div>
</form>

<style lang="scss">
	form {
		--radius: min(var(--ui-radius-xl), calc(var(--ui-scroll-px) * 0.2));
		width: 100%;
		padding-block: calc(var(--ui-nav-px) + var(--ui-gutter));
		min-height: 100vh;
		margin: 0 auto;
		margin-top: calc(-1 * var(--ui-nav-px));
		background: col(bg, 500);
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
		max-width: var(--ui-width-main);
		width: 100%;
		gap: 1rem;
	}

	h1 {
		width: 100%;
		max-width: var(--ui-width-p);
		font-size: var(--ui-text-2xl);
		font-weight: 600;
		text-align: center;
		margin-bottom: 5rem;
	}

	section {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1em;
		opacity: 0.2;
	}

	form :global(.title) {
		width: 100%;
		max-width: var(--ui-width-main);
		font-size: 1.5rem;
	}
</style>
