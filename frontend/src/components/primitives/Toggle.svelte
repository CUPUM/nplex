<script lang="ts">
	export let checked = false;
	export let labelChecked: string = undefined;
	export let labelUnchecked: string = undefined;
</script>

<!-- Click anywhere on component => toggle (invert boolean value) -->
<label>
	<input type="checkbox" bind:checked />
	<span>
		<slot />
	</span>
</label>

<style>
	label {
	}
</style>
