<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form action="?/update" method="POST" use:enhance>
	<!-- Stuff here -->
</form>

<style lang="scss">
</style>
