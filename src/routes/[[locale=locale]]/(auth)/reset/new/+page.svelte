<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<fieldset>
		<label for="">New password</label>
		<input type="password" name="newPassword" id="" />
		<label for="">Confirm password</label>
		<input type="password" name="confirmPassword" id="" />
	</fieldset>
	<button type="submit">Set new password</button>
</form>

<style lang="scss">
</style>
