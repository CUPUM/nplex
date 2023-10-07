<script lang="ts">
	import { createLoading } from '$lib/actions/loading';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, CheckCircle, ShieldX } from 'lucide-svelte';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			firstName: 'Prénom',
			middleName: 'Surnom',
			lastName: 'Nom de famille',
			publicEmail: 'Courriel public',
			update: 'Enregistrer',
		},
		en: {
			firstName: 'First name',
			middleName: 'Middle name',
			lastName: 'Last name',
			publicEmail: 'Public email',
			update: 'Update',
		},
	});

	export let data;

	const { form, constraints, enhance, submitting, delayed, tainted } = superForm(data.form);

	const { element: updateElement, action: updateAction } = createLoading({ state: delayed });
</script>

<form method="POST" use:enhance action="?/update">
	<label>
		<span>{$t.firstName}</span>
		<input
			class="input"
			type="text"
			name="firstName"
			{...$constraints.firstName}
			bind:value={$form.firstName}
		/>
	</label>
	<label>
		<span>{$t.middleName}</span>
		<input
			class="input"
			type="text"
			name="middleName"
			{...$constraints.middleName}
			bind:value={$form.middleName}
		/>
	</label>
	<label>
		<span>{$t.lastName}</span>
		<input
			class="input"
			type="text"
			name="lastName"
			{...$constraints.lastName}
			bind:value={$form.lastName}
		/>
	</label>
	<label>
		<span>
			{$t.publicEmail}
			{#if data.profile.publicEmailVerified}
				<CheckCircle class="label-icon" />
			{:else}
				<ShieldX class="label-icon" />
			{/if}
		</span>
		<input
			class="input"
			type="email"
			name="publicEmail"
			{...$constraints.publicEmail}
			bind:value={$form.publicEmail}
			placeholder="...@..."
		/>
	</label>
	{#if $tainted}
		<button
			in:fly={{ y: 6, duration: 250 }}
			out:scale={{ start: 0.95, duration: 250 }}
			class="button outlined"
			use:updateAction
			{...$updateElement}
			disabled={$submitting ?? undefined}
		>
			<Check class="button-icon" />
			{$t.update}
		</button>
	{/if}
</form>

<style lang="postcss">
	form {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1em;
		align-items: flex-start;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		span {
			text-indent: 1em;
			font-size: var(--size-sm);
			display: flex;
			flex-direction: row;
			gap: 1em;
			align-items: center;
		}

		:global(.label-icon) {
			width: 1em;
			stroke-width: 2.5;
		}
	}

	.button {
		font-size: var(--size-sm);
	}
</style>
