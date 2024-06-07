<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { FileUp, Mail, Shield, ShieldX } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, enhance, constraints, tainted, submitter, submitting } = extendSuperForm(
		superForm(data.profileForm)
	);
</script>

<form use:enhance action="?/profile">
	<h2>
		{m.user_profile_settings()}
	</h2>
	<section>
		<h3>{m.user_name()}</h3>
		<fieldset>
			<input
				type="text"
				class="input"
				bind:value={$form.firstName}
				{...$constraints.firstName}
				placeholder={m.user_first_name()}
			/>
			<input
				type="text"
				class="input"
				bind:value={$form.middleName}
				{...$constraints.middleName}
				placeholder={m.user_middle_name()}
			/>
		</fieldset>
		<input
			type="text"
			class="input"
			bind:value={$form.lastName}
			{...$constraints.lastName}
			placeholder={m.user_last_name()}
		/>
	</section>
	<section>
		<h3>{m.user_avatar()}</h3>
		<label>
			{m.user_upload_avatar()}
			<FileUp class="button-icon" />
			<input type="file" class="button" id="avatar-button" disabled formaction="?/avatar" />
		</label>
	</section>
	<section>
		<h3>{m.user_public_email()}</h3>
		<label class="input-group">
			{#if $page.data.user?.emailVerified}
				<Shield class="input-icon" style="color: var(--color-success-500)" />
			{:else}
				<ShieldX class="input-icon" style="color: var(--color-error-500)" />
			{/if}
			<input
				type="email"
				name="publicEmail"
				class="input"
				bind:value={$form.publicEmail}
				placeholder={m.user_public_email()}
			/>
			<div class="input-peer">
				<button class="button" formaction="?/verifyEmail" disabled>
					<Mail class="button-icon" />
					{m.user_verify()}
				</button>
			</div>
		</label>
	</section>
</form>
