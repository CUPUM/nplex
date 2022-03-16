<script lang="ts">
	export let checked;
	export let labelChecked: string;
	export let labelUnchecked: string;
</script>

<!-- Click anywhere on component => toggle (invert boolean value) -->
<label>
	<input type="checkbox" bind:checked />
</label>

<style>
	label {
	}
</style>
