<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/primitives/Field.svelte';
	import Toggle from '$components/primitives/Toggle.svelte';

	let toggled = false;
</script>

<article>
	<Toggle bind:toggled />
	{toggled}
	<hr />
	<label for="tesa">
		Test
		<input id="tesa" type="checkbox" />
	</label>
	<hr />
	<Field variant="outlined">
		<svelte:fragment slot="label">Test</svelte:fragment>
	</Field>
</article>

<style lang="scss" module>
	article {
		padding: 4rem;
	}

	.label {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: black;
	}

	.field-class {
		color: red;
		background-color: black;
		box-shadow: 0 0 1em black;
		display: inline-block;

		&:hover {
			box-shadow: 0 0 2em black;
		}
	}
</style>
