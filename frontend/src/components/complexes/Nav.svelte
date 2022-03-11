<script lang="ts">
	import { topRoutes } from '$utils/routes';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Dropdown from '$components/primitives/Dropdown.svelte';

	let userExpand = false;
</script>

<nav>
	<section id="logo">
		<Logo intro={true} />
	</section>
	<section id="main">
		{#each topRoutes as route}
			<Button size="small" href={route.href} text={route.title} />
		{/each}
	</section>
	<section id="user">
		<Button size="small" icon="home" />
		<Button icon="info" />
		<Dropdown bind:active={userExpand}>
			<Button slot="trigger" size="small" icon="user" on:click={() => (userExpand = !userExpand)} />
			test
		</Dropdown>
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
	}

	#logo {
		position: relative;
		height: 1.5rem;
	}
</style>
