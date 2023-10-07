<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, enhance } = superForm(data.form);
</script>

<form method="POST" use:enhance>
	<label for="email">Email</label>
	<input type="text" name="email" id="email" bind:value={$form.email} />
	<button type="submit">Submit</button>
</form>

<style lang="postcss">
</style>
