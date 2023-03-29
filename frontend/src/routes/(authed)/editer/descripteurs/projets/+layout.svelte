<script lang="ts">
	import { enhance } from '$app/forms';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../constants';
</script>

<form
	class="editor-form"
	id={EDITOR_FORM_ID}
	action={EDITOR_FORM_ACTION}
	method="POST"
	use:enhance={(a) => {
		return (f) => {
			f.update({ reset: false });
		};
	}}
>
	<slot />
</form>

<style lang="scss">
</style>
