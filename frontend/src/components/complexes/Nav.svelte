<script lang="ts">
	import { creationBaseRoute, creationRoutes, rootRoute, topRoutes, userBaseRoute } from '$utils/routes';
	import Button from '$components/primitives/Button.svelte';
	import Logo from '$components/primitives/Logo.svelte';
	import Popover from '$components/primitives/Popover.svelte';
	import ButtonSet from '$components/primitives/ButtonSet.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { topRoute } from '$stores/route';
	import { colors } from '$utils/colors';
	import { session } from '$app/stores';
	import AvatarButton from '$components/primitives/AvatarButton.svelte';
	import { sizes } from '$utils/sizes';

	let userExpand = false;
	const size = sizes.small;
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
		{#if $session.user}
			<Popover placement="bottom" align="end" useHover={true}>
				<Button {size} {variant} slot="control">Créer</Button>
				{#each creationRoutes as r}
					<Button {size} {variant} href={r.pathname}>{r.title}</Button>
				{/each}
			</Popover>
			<AvatarButton {size} />
		{:else}
			<Button {size} {variant} square={true} href={userBaseRoute.pathname} icon="user" />
		{/if}
		<Popover placement="bottom" align="end">
			<Button {size} {variant} slot="control">Test</Button>
			{#each creationRoutes as r}
				<Button {size} {variant} href={r.pathname}>{r.title}</Button>
			{/each}
		</Popover>
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
