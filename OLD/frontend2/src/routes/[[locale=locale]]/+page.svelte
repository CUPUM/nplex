<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: if (form) {
		console.log(form);
	}
</script>

<form method="POST" use:enhance action="?/pg">
	<fieldset>
		<h2>Drizzle pg</h2>
		<button type="submit" formaction="?/pg">Test!</button>
	</fieldset>
	<fieldset>
		<h2>Drizzle gov apis</h2>
		<button type="submit" formaction="?/apis">Test!</button>
	</fieldset>
</form>

<style lang="scss">
</style>
