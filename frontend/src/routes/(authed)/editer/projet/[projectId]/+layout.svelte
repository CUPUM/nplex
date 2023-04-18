<script lang="ts">
	import { enhanceEditor } from '../../common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../constants';
	import { descriptors, project } from './common';

	export let data;

	function syncDown() {
		descriptors.set(data.descriptors);
		project.set(JSON.parse(JSON.stringify(data.project)));
	}
	syncDown();
	$: data, syncDown();
</script>

<form
	class="editor-form"
	use:enhanceEditor
	method="POST"
	action="?/{EDITOR_FORM_ACTION}"
	id={EDITOR_FORM_ID}
>
	<slot />
</form>

<style lang="scss">
</style>
