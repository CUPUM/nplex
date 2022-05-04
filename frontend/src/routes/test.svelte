<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import type { SvelteProps } from '$utils/helpers/types';

	let alt = false;
	let useHover;
	let switchval = 'test2v';

	$: console.log(switchval);
</script>

<div>
	<input type="checkbox" name="" id="" bind:checked={useHover} />
	<Popover {useHover} align="end" placement="bottom">
		<Button slot="control">Popover</Button>
		<Button>Popver item</Button>
		<Button>Popver item with long text</Button>
	</Popover>
</div>
<div>
	<Tooltip message="Bonjour, je suis un tooltip!"><Button icon="new-file" /></Tooltip>
</div>
<div>
	<Switch orientation="column" name="test">
		<SwitchItem id="test1" bind:group={switchval} value="test1v">Test 1</SwitchItem>
		<SwitchItem id="test2" bind:group={switchval} value="test2v">Test 2</SwitchItem>
		<SwitchItem id="test3" bind:group={switchval} value="test3v">Test 3</SwitchItem>
	</Switch>

	<Switch orientation="row" name="test">
		<SwitchItem id="test1" bind:group={switchval} value="test1v">Test 1</SwitchItem>
		<SwitchItem id="test2" bind:group={switchval} value="test2v">Test 2</SwitchItem>
		<SwitchItem id="test3" bind:group={switchval} value="test3v">Test 3</SwitchItem>
	</Switch>
</div>

<style>
	#test {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 6px;
		margin: 0 auto;
		resize: both;
	}

	div {
		width: 600px;
		padding: 4rem;
		margin: 2rem auto;
	}

	h2 {
		font-size: 2rem;
		padding: 0;
		margin: 0;
	}

	form {
		width: 500px;
		margin: 0 auto;
		padding: 1rem;
	}

	fieldset {
		display: flex;
		flex-direction: column;
	}
</style>
