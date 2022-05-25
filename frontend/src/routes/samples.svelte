<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Select from '$components/primitives/Select.svelte';
	import SelectOption from '$components/primitives/SelectOption.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { colors } from '$utils/colors';

	let alt = false;
	let useHover;
	let switchval = 'test2v';
	let active = false;

	let variants = ['default', 'secondary', 'ghost', 'cta', 'nav'];
	let sizes = ['small', 'medium', 'large'];
	let size = sizes[0];

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
	<h2>Buttons</h2>
	<Checkbox bind:checked={active} />
	<Select id="size-select" bind:value={size}>
		{#each sizes as size}
			<SelectOption value={size} id="{size}-id">{size}</SelectOption>
		{/each}
	</Select>
	{#each variants as variant}
		<h3>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
		<div id="buttons">
			<Button {active} {variant}>With text</Button>
			<Button {active} {variant} icon="email">With text and icon</Button>
			<Button {active} {variant} icon="settings" />
		</div>
	{/each}
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
		justify-content: flex-start;
		align-items: flex-start;
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

	#buttons {
		margin: 1rem 0;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	section {
		width: 600px;
		padding: 2rem;
		margin: 0 auto;
	}

	h2 {
		font-size: 2rem;
		padding: 0;
		margin: 1rem 0 2rem 0;
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
