<script lang="ts">
	import { enhance } from '$app/forms';
	import { updating } from '../../common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../constants';
	import { descriptors, project } from './common';

	export let data;

	$: $descriptors = data.descriptors;

	function syncProjectData() {
		project.set(JSON.parse(JSON.stringify(data.project)));
	}
	syncProjectData();
	$: data, syncProjectData();
</script>

<form
	class="editor-form"
	use:enhance={({ form, data, action, cancel }) => {
		updating.set(true);
		return async ({ update, result }) => {
			await update({ reset: false });
			updating.set(false);
			// if (result.type !== 'success' && result.type !== 'redirect') {
			// }
		};
	}}
	on:submit={(e) => {
		console.log(e.submitter);
	}}
	method="POST"
	action="?/{EDITOR_FORM_ACTION}"
	id={EDITOR_FORM_ID}
>
	<slot />
</form>

<style lang="scss">
</style>
