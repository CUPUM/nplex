<script lang="ts" context="module">
</script>

<script lang="ts">
	import { browser } from '$app/environment';

	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import TextArea from '$components/TextArea.svelte';
	import type { ComponentProps } from 'svelte';

	let name: ComponentProps<Icon>['name'] = 'search';
	let variant: ComponentProps<Button>['variant'] = 'default';
	let size = 26;

	let contentAlign = 'center';

	let dark = false;

	function switchTheme(theme: 'light' | 'dark') {
		if (browser) {
			document.documentElement.classList.remove('theme-light');
			document.documentElement.classList.remove('theme-dark');
			document.documentElement.classList.add('theme-' + theme);
		}
	}

	$: switchTheme(dark ? 'dark' : 'light');
</script>

<article>
	<section>
		<Field prefix="test" suffix="some suffix" {variant}>
			<svelte:fragment slot="label">Some label</svelte:fragment>
			<Button slot="leading">Test yezzir</Button>
		</Field>
		<Field prefix="test" {variant} placeholder="Placeholder!">
			<svelte:fragment slot="label">Test label</svelte:fragment>
			<Button slot="trailing">Test yezzir</Button>
			<Button slot="leading">Test yezzir</Button>
		</Field>
		<Field prefix="test" {variant} placeholder="Placeholder without label!">
			<Button slot="leading">Test yezzir</Button>
		</Field>
		<TextArea />
	</section>
	<label>
		{dark ? 'Light theme' : 'Dark theme'}
		<input type="checkbox" name="" id="" bind:checked={dark} />
	</label>
	<hr />
	<select name="" bind:value={variant} id="">
		{#each ['default', 'outlined', 'ghost', 'cta'] as v}
			<option value={v}>{v}</option>
		{/each}
	</select>
	<select name="" bind:value={contentAlign} id="">
		{#each ['left', 'center', 'right'] as a}
			<option value={a}>{a}</option>
		{/each}
	</select>
	<section class="bg">
		<Button {variant} {contentAlign}>Test</Button>
		<Button {variant} {contentAlign}><Icon name="user" slot="leading" />Test</Button>
		<Button {variant} {contentAlign}><Icon style="font-size: {size}px" name="user" slot="leading" />Test</Button>
		<Button {variant} {contentAlign} style="width: 100%">Test</Button>
	</section>
	<section>
		<Button {variant} {contentAlign}>Test</Button>
		<Button {variant} {contentAlign}><Icon name="user" slot="leading" />Test</Button>
		<Button {variant} {contentAlign}><Icon style="font-size: {size}px" name="user" slot="leading" />Test</Button>
		<Button {variant} {contentAlign} style="width: 100%">Test</Button>
	</section>

	<Icon bind:name style="font-size: {size}px" />
	<hr />
	<input type="range" name="" min="12" max="56" bind:value={size} id="" />
</article>

<style lang="scss" module>
	article {
		padding: 4rem;
		line-height: 5em;
	}
	section {
		padding: 4rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;
	}

	section.bg {
		background-image: url(https://images.unsplash.com/photo-1564851375740-1052e619dcbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vc2V8ZW58MHx8MHx8&w=1000&q=80);
		background-size: contain;
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
