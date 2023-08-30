<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			newPassword: 'Nouveau mot de passe',
			confirmPassword: 'Confirmation du nouveau mot de passe',
		},
		en: {
			newPassword: 'New password',
			confirmPassword: 'Confirm new password',
		},
	});

	export let data;

	const { form, enhance, constraints, errors } = superForm(data.form);
</script>

<form use:enhance method="POST">
	<fieldset>
		<label for="">{$t.newPassword}</label>
		<input type="password" name="newPassword" id="" />
	</fieldset>
	<fieldset>
		<label for="">{$t.confirmPassword}</label>
		<input type="password" name="confirmPassword" id="" />
	</fieldset>
	<button type="submit">Set new password</button>
</form>

<style lang="scss">
</style>
