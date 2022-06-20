<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Range from '$components/primitives/Range.svelte';
	import RangeThumb from '$components/primitives/RangeThumb.svelte';
	import Select from '$components/primitives/Select.svelte';
	import SelectOption from '$components/primitives/SelectOption.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { backgroundColor } from '$stores/backgroundColor';
	import { slip } from '$transitions/slip';
	import type { SvelteProps } from '$types/helpers';
	import { colors } from '$utils/colors';
	import { cssSize } from '$utils/helpers/css';
	import { sizes } from '$utils/sizes';

	let alt = false;
	let useHover;
	let switchval = 'test2v';
	let active = false;
	let showLoading = true;
	let loadingSize = sizes.medium;
	let showTransitionBlock = false;

	let variants: SvelteProps<Button>['variant'][] = ['default', 'secondary', 'ghost', 'cta', 'navbar'];
	let sizeKeys = Object.keys(sizes);
	let currentSize = sizes.medium;

	$: console.log(switchval);
</script>

<section />
<section>
	<h2>BgColor</h2>
	<div>
		<p>Color: {$backgroundColor}</p>
		<input type="color" bind:value={$backgroundColor} />
	</div>
</section>
<section>
	<h2>Transition Test</h2>
	<Checkbox bind:checked={showTransitionBlock}>Show transition block</Checkbox>
	<div>
		{#if showTransitionBlock}
			<Button>Test for component transition prop</Button>
			<div
				id="test-block"
				style="width: 200px; height: 200px; background-color: blue; position: relative;"
				in:slip={{ height: true, x: 200, duration: 450, scale: 0.1, overflow: 'visible', opacity: 0 }}
				out:slip={{ height: true, x: 200, scale: 0.1, overflow: 'visible', opacity: 0 }}
			>
				<p>Content of transition!</p>
			</div>
		{/if}
	</div>
</section>
<section>
	<h2>Loading</h2>
	<Checkbox bind:checked={showLoading}>Show loading</Checkbox>
	<Range min={10} max={100} bind:value={loadingSize}>
		<RangeThumb value={loadingSize} name="loading-size" />
	</Range>
	<div style="position: relative; height: {cssSize(loadingSize)}; margin-top: 2rem;">
		{#if showLoading}
			<Loading size={loadingSize} />
		{/if}
	</div>
</section>
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
	<Select id="size-select" bind:value={currentSize}>
		{#each sizeKeys as k}
			<SelectOption value={sizes[k]} id="{k}-id">{k}</SelectOption>
		{/each}
	</Select>
	{#each variants as variant}
		<h3>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
		<div id="buttons">
			<Button {active} {variant} size={currentSize}>With text</Button>
			<Tooltip message="Testy test">
				<Button {active} {variant} size={currentSize}><Icon slot="icon" name="user" />With text and icon</Button
				>
			</Tooltip>
			<Button {active} {variant} size={currentSize}><Icon slot="icon" name="settings" /></Button>
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
