<script lang="ts">
	import { enhance } from '$app/forms';

	async function getData() {
		const res = await fetch('/api/test.json');
		if (res.ok) {
			const json = await res.json();
			console.log(json);
		}
	}
</script>

<article>
	<form use:enhance method="POST">
		<input type="text" name="name" placeholder="Nameridoo" id="" />
		<button type="submit">Submit that name</button>
	</form>
	<button on:click={getData}>Get server data!</button>
</article>

<style lang="scss">
	article {
		padding: 5rem;
	}
</style>
