<script lang="ts">
	import { enhance } from '$app/forms';
	import { updating } from '../../common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../constants';
</script>

<form
	class="editor-form"
	id={EDITOR_FORM_ID}
	action={EDITOR_FORM_ACTION}
	method="POST"
	use:enhance={async (a) => {
		updating.set(true);
		return async (f) => {
			await f.update({ reset: false });
			updating.set(false);
		};
	}}
>
	<slot />
</form>

<style lang="scss">
</style>
