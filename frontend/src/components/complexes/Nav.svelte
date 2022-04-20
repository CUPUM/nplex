<script lang="ts">
	import { rootRoute, topRoutes, userBaseRoute } from '$utils/routes';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import ButtonSet from '$components/primitives/ButtonSet.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { topRoute } from '$stores/route';
	import { colors } from '$utils/colors';

	let userExpand = false;
	const size = 'small';
	const variant = 'nav';
</script>

<nav>
	<section id="logo">
		<a href="/">
			<Logo intro={true} color={colors.dark[500]} hoverColor={colors.primary[500]} />
		</a>
	</section>
	<section id="main">
		{#each topRoutes as route}
			<Button {size} {variant} active={route === $topRoute} href={route.pathname}>{route.title}</Button>
		{/each}
	</section>
	<section id="user">
		<Button {size} {variant} href="/" square={true} icon="home" />
		<Button {size} {variant} square={true} icon="info" />
		<Button {size} {variant} square={true} href={userBaseRoute.pathname} icon="user" />
		<Popover bind:active={userExpand} placement="bottom" align="end">
			<Button
				{size}
				{variant}
				slot="control"
				square={true}
				active={userExpand}
				on:click={() => (userExpand = true)}
				icon="more"
			/>
			<Button display="block" contentAlign="left" size="small">Paramètres</Button>
			<Button display="block" contentAlign="left" size="small">Information</Button>
			<Button display="block" contentAlign="left" size="small">Te123123st</Button>
		</Popover>
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
		padding: 0.75rem 1.5rem;
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
		padding: 0 0.5rem;
	}
</style>
