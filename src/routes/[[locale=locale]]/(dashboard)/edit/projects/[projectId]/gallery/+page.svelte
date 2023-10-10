<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageInput from './ImageInput.svelte';

	export let data;
</script>

<form action="?/update" method="POST" use:enhance enctype="multipart/form-data">
	<ImageInput />
</form>

<style lang="postcss">
	form {
		padding: 2rem;
	}
</style>
