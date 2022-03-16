<script lang="ts">
	import { topRoutes } from '$utils/routes';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import ButtonGroup from '$components/primitives/ButtonGroup.svelte';
	import Icon from '$components/primitives/Icon.svelte';

	let userExpand = false;
	const size = 'small';
	const variant = 'nav';
</script>

<nav>
	<section id="logo">
		<a href="/">
			<Logo intro={true} />
		</a>
	</section>
	<section id="main">
		{#each topRoutes as route}
			<Button {size} {variant} href={route.href}>{route.title}</Button>
		{/each}
	</section>
	<section id="user">
		<Button {size} {variant} square={true}>
			<Icon name="home" />
		</Button>
		<Button {size} {variant} square={true}>
			<Icon name="info" />
		</Button>
		<Popover bind:active={userExpand}>
			<Button {size} {variant} slot="control" square={true} on:click={() => (userExpand = true)}>
				<Icon name="user" />
			</Button>
			<ButtonGroup direction="vertical">
				<Button>Test</Button>
				<Button>Test</Button>
				<Button>Test</Button>
			</ButtonGroup>
		</Popover>
		<Button {size} {variant} square={true}>
			<Icon name="more" />
		</Button>
		<!-- <Button icon="settings (three dots)" /> -->
	</section>
</nav>

<style lang="postcss">
	nav {
		position: relative;
		top: 0;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 1rem 1.5rem;
		background-color: var(--color-light-500);
	}

	section {
		display: inline-flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		gap: 3px;

		&:first-child {
			justify-content: flex-start;
		}

		&:last-child {
			justify-content: flex-end;
		}
	}

	#logo {
		position: relative;
		height: 1.5rem;
	}
</style>
