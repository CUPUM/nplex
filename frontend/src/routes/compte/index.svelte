<script lang="ts">
	import { session } from '$app/stores';

	console.log($session.user);

	let userData = [];

	$: if ($session.user) {
		userData = Object.entries($session.user);
	} else {
		userData = [];
	}
</script>

<h1>Mon compte</h1>
<ul>
	{#each userData as [k, v]}
		<li>{k}: {v}</li>
	{/each}
</ul>

<style>
</style>
