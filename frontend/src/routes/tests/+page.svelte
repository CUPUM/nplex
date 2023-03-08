<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import ButtonGroup from '$components/Button/ButtonGroup.svelte';
	import DragndropContext from '$components/Dragndrop/DragndropContext.svelte';
	import Popover from '$components/Popover.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import Tooltip from '$components/Tooltip.svelte';

	let items = [
		{ id: 'test', checked: false, label: '32rsf4wsoad asdpoajda' },
		{ id: '21312', checked: false, label: 'Bonaosdj' },
		{ id: 'da3e', checked: false, label: '21345mACJA' },
		{ id: '12312e', checked: false, label: 'a21467648648 ' },
		{ id: '15a', checked: false, label: 'asdaf asdpoajda' },
		{ id: '1135a', checked: false, label: 'asdaf14' },
		{ id: '131455a', checked: false, label: 'asd325246naf asdpoajda' },
		{ id: '1aasda5a', checked: false, label: '35a' },
	];
</script>

<article>
	<ButtonGroup let:key orientation="column">
		<Button group={key}>Okidoki</Button>
		<Tooltip message="chaotic tooltip">
			<Button group={key}>Test2</Button>
		</Tooltip>
		<Popover>
			<Button slot="control" group={key}>Test3</Button>
			<h1>Hello</h1>
			<h2>Test</h2>
			<!-- <ButtonGroup> -->
			<Button>Test inner1</Button>
			<Button>Test inner2</Button>
			<Button>Test inner3</Button>
			<!-- </ButtonGroup> -->
		</Popover>
		<Button group={key}>Test4</Button>
	</ButtonGroup>
	<Popover>
		<button slot="control">Test</button>
		<ul>
			<li>test1</li>
			<li>test1</li>
			<li>test1</li>
			<li>test1</li>
			<li>test1</li>
		</ul>
	</Popover>
</article>
<article>
	<pre>{JSON.stringify(items, undefined, 2)}</pre>
	<DragndropContext bind:items let:dragndropZone let:dragndropItem>
		<ol use:dragndropZone>
			{#each items as item (item.id)}
				<li use:dragndropItem={{ item }}>
					{item.label}
					<br />
					<Toggle bind:checked={item.checked}>{item.checked}</Toggle>
				</li>
			{/each}
		</ol>
	</DragndropContext>
</article>

<style lang="scss">
	article {
		padding: 5rem 1.5rem;
		width: 100%;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 350px 1fr;
	}

	.test {
		padding: 1rem;
		border: 1px solid blue;
	}

	pre {
		padding: 1rem;
		margin: 0;
	}

	ol {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
		gap: 1rem;
	}

	li {
		width: 100%;
		aspect-ratio: 1;
		border: 1px solid black;
		border-radius: 1em;
	}
</style>
