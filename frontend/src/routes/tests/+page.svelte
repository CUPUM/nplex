<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import Tooltip from '$components/Tooltip.svelte';

	let group = '1';
	let size = 12;
	let s = 'c';
</script>

<article>
	<Field>
		<Button slot="leading">Test</Button>
		<Tooltip message="some tooltip!" slot="trailing">
			<Button>With tooltip!</Button>
		</Tooltip>
	</Field>
	<Tooltip message="some tooltip!" place="right">
		<Button>With tooltip!</Button>
	</Tooltip>
</article>
<article class="test">
	<Switch bind:group={s}>
		<SwitchItem value="a">TEST <Icon name="file" /></SwitchItem>
		<SwitchItem value="b"
			>Tesass asd asd asd asda sddt <Icon name="user" style="font-size: 2.5em" /></SwitchItem
		>
		<SwitchItem value="c">Test</SwitchItem>
	</Switch>
</article>

<style lang="scss" module>
	article {
		padding: 4rem;
	}

	.test {
		font-size: 1rem;
	}

	button {
		position: absolute;
		font-size: var(--ui-text-md);
		background: col(bg, 500);
		padding: 0 1em;
		height: 3em;
		border-radius: var(--ui-radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.25s ease-out;

		span {
			display: inline-block;
			line-height: 1em;
		}

		&:hover {
			background: col(bg, 700);
		}
	}

	.space {
		height: 200px;
	}
</style>
