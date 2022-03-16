<script lang="ts">
	import { topRoutes } from '$utils/routes';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import ButtonGroup from '$components/primitives/ButtonGroup.svelte';

	let userExpand = false;
</script>

<nav>
	<section id="logo">
		<a href="/">
			<Logo intro={true} />
		</a>
	</section>
	<section id="main">
		{#each topRoutes as route}
			<Button size="small" href={route.href}>{route.title}</Button>
		{/each}
	</section>
	<section id="user">
		<Button size="small" icon="home" />
		<Button icon="info" />
		<Popover bind:active={userExpand}>
			<Button slot="control" size="small" icon="user" on:click={() => (userExpand = true)} />
			<ButtonGroup direction="vertical">
				<Button>Test</Button>
				<Button>Test</Button>
				<Button>Test</Button>
			</ButtonGroup>
		</Popover>
		<Button size="small" icon="more" />
		<!-- <Button icon="settings (three dots)" /> -->
	</section>
</nav>

<style lang="postcss">
	nav {
		position: relative;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1.5rem;
		background-color: var(--color-light-500);
	}

	section {
		display: inline-flex;
		flex-direction: row;
		gap: 3px;
	}

	#logo {
		position: relative;
		height: 1.5rem;
	}
</style>
