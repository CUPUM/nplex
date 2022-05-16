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
	import { signOut } from '$utils/auth';
	import { fly, scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	const variant = 'nav';
	const userSize = sizes.small;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<nav>
	{#if mounted}
		<section id="logo" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut }}>
			<a href="/">
				<Logo intro={true} color={colors.dark[500]} hoverColor={colors.primary[500]} />
			</a>
		</section>
		<section id="main" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 500 }}>
			{#each topRoutes as route}
				<Button size={sizes.small} {variant} active={route === $topRoute} href={route.pathname}
					>{route.title}</Button
				>
			{/each}
		</section>
		<section id="user" in:fly={{ y: -20, opacity: 0, duration: 500, easing: expoOut, delay: 1000 }}>
			<Button size={userSize} {variant} href="/" square={true} icon="home" />
			{#if $session.user}
				<Popover placement="bottom" align="end" useHover={true}>
					<Button
						slot="control"
						size={userSize}
						{variant}
						href={creationBaseRoute.pathname}
						icon="new-file"
					/>
					{#each creationRoutes as r}
						<Button size={userSize} {variant} href={r.pathname}>{r.title}</Button>
					{/each}
				</Popover>
				<Popover useHover={true} placement="bottom" align="end">
					<AvatarButton slot="control" size={userSize} href={userBaseRoute.pathname} />
					<Button>Autre option</Button>
					<Button on:click={signOut}>Se déconnecter</Button>
				</Popover>
			{:else}
				<Button size={userSize} {variant} square={true} href={userBaseRoute.pathname} icon="user" />
			{/if}
		</section>
	{/if}
</nav>

<style lang="postcss">
	nav {
		position: relative;
		top: 0;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 0.5rem 0;
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
