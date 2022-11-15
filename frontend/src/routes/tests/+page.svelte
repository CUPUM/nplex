<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
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
	<!-- <section>
		{$documentTheme}
		<input type="radio" name="" value="theme-light" bind:group={$documentTheme} id="" />
		<input type="radio" name="" value="theme-dark" bind:group={$documentTheme} id="" />
	</section>
	<br /><br />
	<section>
		{#each ['default', 'outlined', 'cta', 'ghost', 'danger'] as variant}
			<h2>{variant}:</h2>
			<Button {variant}>
				<Icon name="search" />
				Some text
			</Button>
			<Field placeholder="A test" {variant}>
				<svelte:fragment slot="label">Field label yay :D</svelte:fragment>
				<Switch slot="leading" variant="outlined" bind:group>
					<SwitchItem value="1">Test</SwitchItem>
					<SwitchItem value="2">Test 2</SwitchItem>
					<SwitchItem value="3">Test 3</SwitchItem>
				</Switch>
				<svelte:fragment slot="trailing">
					<Button>Default</Button>
					<Button variant="ghost">Ghost</Button>
					<Button equi variant="cta"><Icon name="settings" /></Button>
					<Button variant="outlined">Outlined</Button>
				</svelte:fragment>
			</Field>
		{/each}
	</section> -->
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
