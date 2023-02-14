<script lang="ts">
	import { page } from '$app/stores';
	import OverflowEffect from '$components/OverflowEffect.svelte';

	const links = [
		{ href: '/tests', title: 'Playground' },
		{ href: '/tests/sizes', title: 'Sizes' },
		{ href: '/tests/components', title: 'Components' },
		{ href: '/tests/tween-height', title: 'Tweening!' },
	] satisfies { href: string; title: string }[];
</script>

<nav class="no-scrollbar">
	<OverflowEffect>
		<div class="inner">
			{#each links as link}
				<a href={link.href} data-current={$page.url.pathname === link.href || undefined}>
					{link.title}
				</a>
			{/each}
		</div>
	</OverflowEffect>
</nav>
<slot />

<style lang="scss">
	nav {
		position: relative;
		display: flex;
		flex-direction: row;
		background: col(fg, 500, 0.2);
		border-radius: 10px;
		overflow-x: scroll;
	}

	.inner {
		display: flex;
		flex-direction: inherit;
		padding: 20px;
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
