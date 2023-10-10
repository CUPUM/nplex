<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageInput from './ImageInput.svelte';

	export let data;
</script>

<form action="?/update" method="POST" use:enhance enctype="multipart/form-data">
	<ul>
		{#each data.images as image}
			<img src={image.urlLg} />
		{/each}
	</ul>
	<ImageInput />
</form>

<style lang="postcss">
	form {
		padding: 2rem;
		display: flex;
		flex-direction: column;
	}
</style>
