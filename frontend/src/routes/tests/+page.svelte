<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon/Icon.svelte';
	import { icons } from '$components/Icon/icons';
	import Toggle from '$components/Toggle.svelte';
	import type { ComponentProps } from 'svelte';

	let toggled = false;
	let name: ComponentProps<Icon>['name'] = 'search';
	let size = 16;
</script>

<article>
	<span>This is a test</span>
	<Button>Test</Button>
	<Icon bind:name style="font-size: {size}px" />
	<input type="range" name="" bind:value={size} min="8" max="48" id="" />
	<select name="" id="" bind:value={name}>
		{#each Object.keys(icons) as iconname}
			<option value={iconname}>{iconname}</option>
		{/each}
	</select>
	<hr />
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
		line-height: 5em;
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
