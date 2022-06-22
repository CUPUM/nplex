<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Field from '$components/primitives/Field.svelte';
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
	import { messages } from '$stores/message';
	import type { SvelteProps } from '$types/helpers';
	import { colors } from '$utils/colors';
	import { cssSize } from '$utils/helpers/css';
	import { KeyCode } from '$utils/helpers/keycodes';
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

	function handleKeypress(e) {
		if (e.keyCode === KeyCode.Enter) {
			messages.dispatch({ text: e.target.value, timer: 10000 });
		}
	}
</script>

<article class="core-grid">
	<section>
		<h2>Text styles</h2>
		<h1>Heading 1</h1>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, labore aliquam odit laborum, fugiat in optio
			iure et temporibus libero quo. Voluptatibus provident, soluta repudiandae sequi explicabo temporibus quidem
			dolorem?
		</p>
		<h2>Heading 2 <br /> with multiple lines too</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, reprehenderit! Aliquid voluptates
			incidunt voluptate ipsum, nihil, ipsa eum magnam eius quo, atque aliquam harum tempore dicta nam quisquam
			dolores fugiat alias cum eos corporis! Cumque corrupti fugiat ipsam omnis nobis quam quis veritatis, nam
			doloremque optio obcaecati ut pariatur at ad, rem magni dolor quos est? Temporibus libero optio vitae
			tempora minus. Veniam fugiat maxime unde, libero laudantium animi quae molestias distinctio cupiditate vero
			ex iste?
		</p>
		<h3>Heading 3</h3>
		<p>
			Alias delectus corrupti rerum eius dolores dignissimos, commodi nam, totam error adipisci optio,
			exercitationem debitis enim magni asperiores? Itaque, rem nisi nesciunt a officia sed exercitationem nulla
			voluptatibus, dolore atque quibusdam tempore? Excepturi nam tempora, quos quasi doloribus adipisci explicabo
			id reiciendis consequatur aliquam. Sit corrupti velit, dolorum ipsa laboriosam suscipit magni eaque
			accusantium unde itaque maxime ipsum perspiciatis quia non odit, nihil voluptates eveniet excepturi ad?
		</p>
		<h4>Heading 4</h4>
		<p>
			Doloribus nostrum repudiandae, harum nulla qui nisi illo! Laudantium quasi, dicta ullam magni vitae
			accusamus iure dolor nostrum inventore possimus ipsum, labore quo aspernatur reprehenderit sequi voluptates
			praesentium, fugiat officia repellat. Natus, doloremque?
		</p>
		<h5>Heading 5 &<br />paragraph/body text styles</h5>
		<p>
			Sapiente rem at, doloremque blanditiis perferendis ab optio assumenda expedita nihil autem sed ea atque
			obcaecati numquam eaque explicabo hic possimus iste labore consequuntur. <em
				>This text is emphasized (bolded).</em
			>
		</p>
		<p class="text">
			Misc text: Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nostrum, dolores ut reprehenderit
			quidem ducimus totam exercitationem quam eius et, expedita delectus obcaecati voluptatum! Sint fugiat iure
			quis hic atque. <em>This text is emphasized (bolded).</em> Fugiat incidunt veritatis molestias et odio temporibus?
			Deleniti accusantium rerum ex, at, nisi voluptatibus nesciunt obcaecati nam mollitia perspiciatis consequuntur!
		</p>
		<p>
			Alias delectus corrupti rerum eius dolores dignissimos, commodi nam, totam error adipisci optio,
			exercitationem debitis enim magni asperiores? Itaque, rem nisi nesciunt a officia sed exercitationem nulla
			voluptatibus, dolore atque quibusdam tempore? <span class="text-misc"
				>Excepturi nam tempora, quos quasi doloribus adipisci explicabo id reiciendis consequatur aliquam. Sit
				corrupti velit, dolorum ipsa laboriosam suscipit magni eaque accusantium unde itaque maxime ipsum
				perspiciatis quia non odit, nihil voluptates eveniet excepturi ad?</span
			>
		</p>
	</section>
	<section>
		<h2>Field</h2>
		<Field let:value on:keypress={handleKeypress} placeholder="Ceci est un placeholder">
			<Button type="submit" slot="has-value" on:click={() => messages.dispatch({ text: value, timer: 2500 })}
				>Dispatch app message</Button
			>
		</Field>
		<Field let:value on:keypress={handleKeypress} placeholder="Ceci est un placeholder">
			<Button type="submit" slot="has-value" on:click={() => messages.dispatch({ text: value, timer: 2500 })}
				>Dispatch app message</Button
			>
		</Field>
	</section>
	<section>
		<h2>Loading spinner</h2>
		<p>
			<Checkbox bind:checked={showLoading}>Show loading</Checkbox>
		</p>
		<p>
			Size:
			<Range min={10} max={100} bind:value={loadingSize}>
				<RangeThumb value={loadingSize} name="loading-size" />
			</Range>
		</p>
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
					<Button {active} {variant} size={currentSize}
						><Icon slot="icon" name="user" />With text and icon</Button
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
	<section class="">
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
</article>

<style lang="scss">
	article {
		padding-top: var(--navbar-height);
	}
	section {
		grid-column: main;
		padding: 4rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>
