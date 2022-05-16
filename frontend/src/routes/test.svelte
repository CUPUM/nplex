<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { colors } from '$utils/colors';

	let alt = false;
	let useHover;
	let switchval = 'test2v';

	$: console.log(switchval);
</script>

<section>
	<h2>Colors</h2>
	<div class="palette">
		{#each Object.entries(colors) as [col, palette]}
			<div class="palette-row">
				{#each Object.entries(palette) as [level, val], i}
					<div class="palette-swatch" style:background-color={val}>
						<label style:transition-delay="{i * 50}ms">{col}<br />{level}</label>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>

<section>
	<input type="checkbox" name="" id="" bind:checked={useHover} />
	<Popover {useHover} align="end" placement="bottom">
		<Button slot="control">Popover</Button>
		<Button>Popver item</Button>
		<Button>Popver item with long text</Button>
	</Popover>
</section>
<section>
	<Tooltip message="Bonjour, je suis un tooltip!"><Button icon="new-file" /></Tooltip>
</section>
<section>
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
</section>

<style lang="postcss">
	.palette {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 12px;
	}
	.palette-row {
		--size: 80px;
		display: grid;
		grid-template-columns: repeat(5, var(--size));
		gap: 12px;
		justify-content: center;
		align-items: center;

		&:hover {
			& label {
				opacity: 1;
				transform: translateY(0px);
			}
		}
	}
	.palette-swatch {
		position: relative;
		width: 100%;
		height: var(--size);
		border-radius: 24px;

		& label {
			transform: translateY(5px);
			opacity: 0;
			position: absolute;
			display: block;
			font-size: 11px;
			font-weight: 400;
			top: 0;
			left: 0;
			padding: 1.5em;
			transition: all 0.2s ease-out;
			color: black;
		}
	}

	section {
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
