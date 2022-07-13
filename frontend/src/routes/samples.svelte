<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import Select from '$components/primitives/Select.svelte';
	import SelectOption from '$components/primitives/SelectOption.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import TestRadio from '$components/primitives/TestRadio.svelte';
	import TestRadioSet from '$components/primitives/TestRadioSet.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { messages } from '$stores/messages';
	import type { SvelteProps } from '$types/helpers';
	import { icons } from '$utils/icons/icons';
	import { KeyCode } from '$utils/keys';
	import { sizes } from '$utils/sizes';

	let alt = false;
	let useHover;
	let switchval = 'test2v';
	let active = false;
	let showLoading = true;
	let loadingSize = sizes.medium;
	let showTransitionBlock = false;
	let buttonIcon = true;
	let currentIconName: keyof typeof icons = Object.keys(icons)[0] as keyof typeof icons;

	let radioValue = null;

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
	<!-- <section>
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
		<h2>Background color store</h2>
		<label for="">
			Color: {$backgroundColor}<br />
			<input type="color" name="" bind:value={$backgroundColor} id="" />
		</label>
	</section>
	<section>
		<h2>Field</h2>
		<Field let:value on:keypress={handleKeypress} placeholder="Ceci est un placeholder" placeholderIcon="comment">
			<button slot="left">test</button>
			<Button
				type="submit"
				slot="has-value"
				on:click={() => messages.dispatch({ text: value, timer: 0, type: 'error' })}
				>Dispatch app message</Button
			>
		</Field>
		<h2>Complex field composition</h2>
		<Field type="email">
			<svelte:fragment slot="label">Test</svelte:fragment>
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
							<legend style:transition-delay="{i * 50}ms">{col}<br />{level}</legend>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</section> -->
	<section>
		<h2>Icons</h2>
		<p>
			<Icon size={sizes.xlarge} name={currentIconName} />
		</p>
		<p>
			<select name="" id="" bind:value={currentIconName}>
				{#each Object.keys(icons) as iconName}
					<option value={iconName}>{iconName}</option>
				{/each}
			</select>
		</p>
	</section>
	<section>
		<h2>Main inputs</h2>
		<h3>Button component</h3>
		<p>
			<Checkbox bind:checked={active}>Active or not?</Checkbox>
		</p>
		<p>
			<Checkbox bind:checked={buttonIcon}>Button icon</Checkbox>
		</p>
		<p>
			<span>Size: </span><Select id="size-select" bind:value={currentSize}>
				{#each sizeKeys as k}
					<SelectOption value={sizes[k]} id="{k}-id">{k}</SelectOption>
				{/each}
			</Select>
		</p>
		{#each variants as variant}
			<h4>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h4>
			<Button {active} {variant} size={currentSize}>With text</Button>
			<Tooltip message="Testy test">
				<Button {active} {variant} size={currentSize} icon={buttonIcon ? currentIconName : null}
					>With text and icon</Button
				>
			</Tooltip>
			<Button {active} {variant} size={currentSize} icon={buttonIcon ? currentIconName : null} />
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
		<Tooltip message="Bonjour, je suis un tooltip!"><Button icon="file-add" /></Tooltip>
	</section>
	<section class="">
		<Switch orientation="column" bind:value={switchval} name="test1">
			<SwitchItem id="test1" value="test1v">Test 1</SwitchItem>
			<SwitchItem id="test2" value="test2v">Test 2</SwitchItem>
			<SwitchItem id="test3" value="test3v">Test 3</SwitchItem>
		</Switch>

		<Switch orientation="row" name="test" bind:value={switchval}>
			<SwitchItem id="test1" value="test1v">Test 1</SwitchItem>
			<SwitchItem id="test2" value="test2v">Test 2</SwitchItem>
			<SwitchItem id="test3" value="test3v">Test 3</SwitchItem>
		</Switch>
	</section>
	<section>
		<h2>Testing custom radio / checkbox inputs</h2>
		<Button on:click={() => (radioValue = 'test-1')}>Reset that radioset value ({radioValue})</Button>
		<TestRadioSet value={radioValue}>
			<TestRadio value="test-1">Bonjour je suis un test</TestRadio>
			<TestRadio value="test-2">Test 2 :D</TestRadio>
			<TestRadio value="test-3">Test le 3e, de nom</TestRadio>
		</TestRadioSet>
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

	.palette {
		max-width: 600px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 2rem 1rem;
	}

	.palette-row {
		position: relative;
		grid-column: 1 / -1;
		gap: inherit;
		display: grid;
		grid-template-columns: inherit;

		& legend {
			font-size: var(--size-small);
			position: relative;
			width: 100%;
			height: 100%;
			padding: 1rem;
			opacity: 0;
			transform: translateY(8px);
			transition: all 0.25s ease-out;
		}

		&:hover {
			& legend {
				transform: translateY(0px);
				opacity: 1;
			}
		}
	}

	.palette-swatch {
		border-radius: 1.5rem;
		aspect-ratio: 1;
		width: 100%;
	}
</style>
