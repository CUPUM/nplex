<script lang="ts">
	import { session } from '$app/stores';
</script>

<h1>Mon compte</h1>
<pre>{JSON.stringify($session.user)}</pre>

<style>
</style>
