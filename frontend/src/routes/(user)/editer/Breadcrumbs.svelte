<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';

	$: crumbs = $page.url.pathname
		.split('/')
		.slice(1)
		.reduce((acc, curr) => {
			acc.push({
				segment: curr,
				href: `/${acc.join('/')}/${curr}`,
			});
			return acc;
		}, Array<{ segment: string; href: string }>(0));
</script>

<ol>
	{#each crumbs as crumb}
		<li>
			<span class="slash"><Icon name="chevron-right" style="top: -.1em" /></span>
			<a href={crumb.href}>
				<span>
					{crumb.segment}
				</span>
			</a>
		</li>
	{/each}
</ol>

<style lang="scss">
	ol {
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
		width: 100%;
		padding-inline: var(--ui-gutter);
		max-width: var(--ui-width-main);
		// gap: 0.5em;
		// font-size: 1.2rem;
	}

	li {
		display: flex;
		flex-direction: row;
		// gap: 0.5em;
		align-items: center;
	}

	span {
		poition: relative;
		top: -0.1em;
	}

	.slash {
		user-select: none;
		opacity: 0.25;
	}

	a {
		color: col(fg, 000);
		cursor: pointer;
		text-transform: capitalize;
		padding: 0.5em 0.8em;
		font-weight: 400;

		&:hover {
		}
	}
</style>
