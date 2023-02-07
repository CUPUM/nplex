<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar.svelte';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { fly } from 'svelte/transition';
	import { USER_ROUTES } from '../common';
	import type { LayoutData } from './$types';

	$: ({ profile, roles } = $page.data as LayoutData);
	$: userRoleDetails = roles.find((r) => r.app_role === profile.role.role);
</script>

<menu>
	<header>
		{#if $page.data.session?.user}
			<Avatar data={profile} />
		{/if}
		<hgroup>
			<h1>{profile.first_name}</h1>
			<span>{userRoleDetails?.title}</span>
		</hgroup>
	</header>
	<nav>
		{#each Object.values(USER_ROUTES) as r, i}
			{@const current = $page.url.pathname === r.pathname || undefined}
			<a
				href={r.pathname}
				data-current={current}
				class="{ICON_CLASS.hover} {current ? ICON_CLASS.hold : ''}"
				in:fly={{ x: 10, delay: i * 75 }}
			>
				<Ripple />
				<i>
					<Icon name={r.icon} />
				</i>
				{r.title}
			</a>
		{/each}
	</nav>
</menu>

<style lang="scss">
	menu {
		--radius: var(--ui-radius-md);
		justify-self: flex-start;
		padding-inline: 1.5rem;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: var(--ui-nav-h);
		gap: var(--ui-inset);
	}

	header {
		padding: 1.5rem;
		background-color: col(bg, 000);
		border-radius: var(--ui-radius-lg);
		color: col(fg, 300);
		h1 {
			font-weight: 600;
		}
		span {
			font-weight: 300;
			opacity: 0.5;
		}
	}

	nav {
		display: inherit;
		flex-direction: inherit;
		gap: inherit;
		transition: all 0.25s var(--ui-ease-out);
	}

	a {
		position: relative;
		font-size: var(--ui-text-sm);
		border-radius: var(--radius);
		padding: 1.15em 1.5em;
		padding-bottom: 1.35em;
		line-height: 1em;
		gap: 1em;
		font-weight: 500;
		display: flex;
		flex-direction: row;
		align-items: center;
		transition: all 0.25s var(--ui-ease-out);

		&:focus {
			animation: press 0.25s var(--ui-ease-out);
		}

		i {
			font-size: 1.2em;
		}

		&:hover {
			color: col(primary, 700);
			background: col(primary, 100, 0.25);
		}

		&[data-current] {
			color: col(primary, 500);
			font-weight: 600;
			// background: col(fg, 300);
		}
	}
</style>
