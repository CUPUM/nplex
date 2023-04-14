<script lang="ts">
	import { getFieldContext } from './Field.svelte';

	type D = $$Generic;

	export let data: D;

	const {} = getFieldContext();
</script>

<!-- Template here -->

<style lang="scss">
</style>
