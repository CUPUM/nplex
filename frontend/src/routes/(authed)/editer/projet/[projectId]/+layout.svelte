<script lang="ts">
	import { enhanceEditor } from '../../common';
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
	use:enhanceEditor
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
