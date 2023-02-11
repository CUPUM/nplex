<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;
	export let loading = false;

	$: if (form?.error) {
		messages.error(...[form.error].flat());
	}
	$: if (form?.title) {
		messages.error({ content: form.title.join(' ') });
	}

	let title = '';
</script>

<form
	id="create"
	method="POST"
	action="?/create"
	use:enhance={({ form, data, action, cancel }) => {
		loading = true;
		return async ({ update, result }) => {
			update({ reset: false });
			if (result.type === 'success' || result.type === 'redirect') {
				return;
			}
			loading = false;
		};
	}}
>
	<!-- <div class="illustration">
		<IllustrationNewProject />
	</div> -->
	<div in:scale={{ start: 0.96, easing: cubicOut, duration: 250 }}>
		<h1 in:fly={{ y: 12 }}>Créez votre nouveau projet</h1>
		<fieldset in:fly={{ y: -12, delay: 150 }}>
			<Field
				name="title"
				class="title"
				placeholder="Donnez un titre à vorte projet"
				variant="default"
				bind:value={title}
				invalid={!!form?.title}
			>
				<svelte:fragment slot="trailing">
					<Button type="submit" variant="ghost" disabled={!title} {loading}>
						Créer
						<Icon slot="leading" name="arrow-right" />
					</Button>
				</svelte:fragment>
			</Field>
			<span in:fade={{ delay: 500 }}>
				Vous pourrez toujours modifier le titre une fois le projet créé.
			</span>
		</fieldset>
	</div>
</form>

<style lang="scss">
	form {
		// --radius: min(var(--ui-radius-xl), calc(var(--ui-scroll-y) * 0.2));
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
		padding-bottom: var(--ui-nav-h);
		margin: 0 auto;
		border-bottom: 1px solid col(fg, 900, min(0.1, calc(var(--ui-scroll-y-int) * 0.001)));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// border-bottom-left-radius: var(--radius);
		// border-bottom-right-radius: var(--radius);
	}

	.illustration {
		--base-1: #{col(bg, 100)};
		--base-2: #{col(bg, 300)};
		--base-3: #{col(bg, 900)};
		--accent-1: #{col(primary, 100)};
		--accent-2: #{col(primary, 300)};
		--accent-3: #{col(primary, 500)};
		position: absolute;
		height: 600px;
		opacity: 0.5;
	}

	div {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 2.5rem 3rem;
		border-radius: var(--ui-radius-xl);
		max-width: var(--ui-width-md);
		width: 100%;
		gap: 3rem;
		// border: 1px dashed col(fg, 500, 0.1);
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

	span {
		text-align: center;
		display: inline-block;
		width: 100%;
		margin-top: 2rem;
		font-size: var(--ui-text-md);
		font-weight: 300;
		color: col(fg, 100, 0.5);
	}
</style>
