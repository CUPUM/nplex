<script lang="ts">
	import OverflowEffect from '$components/OverflowEffect.svelte';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import Token from '$components/Token/Token.svelte';

	let v1 = false;
	let v2 = true;
	let v3 = false;

	const opts1 = ['test', 'encore', 'bonjour'];

	const opts2 = Array(5)
		.fill(null)
		.map((_, i) => {
			return {
				name: 'item ' + i,
				v: Math.round(Math.random() * 100),
			};
		});

	let group: string[] = ['test'];
</script>

<article>
	<code>{JSON.stringify(group)}</code>
	<br />
	{#each opts1 as o}
		<Toggle value={o} bind:group name="group">{o}</Toggle>
	{/each}
	<br />
	{#each opts1 as o}
		<Token value={o} variant="outlined">{o}</Token>
	{/each}
	<!-- <Toggle bind:group value={v1}>V1: {v1}</Toggle> -->
</article>
<article>
	<Switch>
		{#each opts1 as o}
			<SwitchItem value={o}>{o}</SwitchItem>
		{/each}
	</Switch>
	<Switch class="test">
		{#each opts1 as o}
			<SwitchItem value={o}>{o}</SwitchItem>
		{/each}
	</Switch>
</article>
<article>
	<nav>
		<OverflowEffect x>
			<div class="inner">
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
			</div>
		</OverflowEffect>
	</nav>
</article>

<style lang="scss">
	article {
		padding: 5rem;

		:global(.test) {
			--switch-direction: column !important;
		}
	}

	nav {
		flex: none;
		display: block;
		border-radius: 1em;
		background: wheat;
		position: relative;
		width: 300px;

		.inner {
			position: relative;
			height: var(--ui-block-size-lg);
			padding: 3px 1em;
			display: inline-flex;
			flex-wrap: nowrap;
			gap: 1em;
			align-items: center;
		}

		a {
			display: block;
			flex: none;
		}
	}
</style>
