<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<form
	id="edit-project"
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<h2>Projet:</h2>
	<input type="text" name="title" id="" placeholder="Titre du projet" />
</form>

<style lang="scss">
	form {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}
</style>
