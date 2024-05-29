<script lang="ts">
	import * as m from '$i18n/messages';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, enhance, constraints, errors } = superForm(data.form);
</script>

<form use:enhance method="POST">
	<fieldset>
		<label for="">
			{m.newPassword()}
		</label>
		<input type="password" name="newPassword" id="" />
	</fieldset>
	<fieldset>
		<label for="">
			{m.newPasswordConfirmation()}
		</label>
		<input type="password" name="confirmPassword" id="" />
	</fieldset>
	<button type="submit">
		{m.save()}
	</button>
</form>

<style>
</style>
