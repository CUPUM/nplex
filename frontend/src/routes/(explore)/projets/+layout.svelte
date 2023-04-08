<script lang="ts">
	import Field from '$components/Field/Field.svelte';
</script>

<form>
	<Field />
</form>
<slot />

<style lang="scss">
	form {
		position: relative;
		z-index: 100;
	}
</style>
