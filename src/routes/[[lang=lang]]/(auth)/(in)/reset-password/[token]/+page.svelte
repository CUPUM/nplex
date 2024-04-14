<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, enhance, constraints, errors } = superForm(data.form);
</script>

<form use:enhance method="POST">
	<fieldset>
		<label for="">
			<LangKey>{m.newPassword()}</LangKey>
		</label>
		<input type="password" name="newPassword" id="" />
	</fieldset>
	<fieldset>
		<label for="">
			<LangKey>{m.newPasswordConfirmation()}</LangKey>
		</label>
		<input type="password" name="confirmPassword" id="" />
	</fieldset>
	<button type="submit">
		<LangKey>{m.save()}</LangKey>
	</button>
</form>

<style>
</style>
