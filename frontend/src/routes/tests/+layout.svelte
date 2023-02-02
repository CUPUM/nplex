<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{ href: '/tests', title: 'Playground' },
		{ href: '/tests/sizes', title: 'Sizes' },
		{ href: '/tests/components', title: 'Components' },
	] satisfies { href: string; title: string }[];
</script>

<nav>
	{#each links as link}
		<a href={link.href} data-current={$page.url.pathname === link.href || undefined}>
			{link.title}
		</a>
	{/each}
</nav>
<slot><!-- optional fallback --></slot>

<style lang="scss">
	nav {
		display: flex;
		flex-direction: row;
		background: col(fg, 500, 0.05);
		padding: var(--ui-inset);
		border-radius: 10px;
	}

	a {
		display: block;
		padding: 0.25rem 0.5rem;
		text-decoration: underline;
		border-radius: 5px;

		&[data-current] {
			color: col(bg, 100);
			background: col(fg, 500);
			text-decoration: none;
		}
	}
</style>
