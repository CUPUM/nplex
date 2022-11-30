<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Loading from '$components/Loading.svelte';
	import Tooltip from '$components/Tooltip.svelte';

	let group = '1';
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
<article>
	<Loading />
</article>

<style lang="scss" module>
	article {
		padding: 4rem;
	}

	div {
		--inset: 10px;
		padding: var(--inset);
		border-radius: calc(3rem - var(--ui-nest-inset));
		border: 1px solid black;
	}
</style>
