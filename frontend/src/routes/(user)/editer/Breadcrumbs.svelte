<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import { fly } from 'svelte/transition';

	function getCrumbs(pathname: string) {
		const segments = pathname.split('/').slice(1);
		return segments.map((s, i) => ({
			text: s,
			href: '/' + segments.slice(0, i + 1).join('/'),
			current: i === segments.length - 1,
		}));
	}

	$: crumbs = getCrumbs($page.url.pathname);
</script>

<nav>
	<ol>
		{#each crumbs as crumb}
			<li>
				<span transition:fly|local={{ x: -6, duration: 300 }} class="sep"
					><Icon name="chevron-right" style="top: -.1em" /></span
				>
				<a
					transition:fly|local={{ x: -12, duration: 300 }}
					href={crumb.href}
					data-current={crumb.current}
				>
					<span>
						{crumb.text}
					</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style lang="scss">
	nav {
		width: 100%;
		max-width: var(--ui-width-main);
		margin: 0 auto;
	}

	ol {
		--inset: 3px;
		--radius: var(--ui-radius-sm);
		display: inline-flex;
		flex-direction: row;
		align-self: flex-start;
		margin-inline: 1rem;
		padding: var(--inset);
		border: 1px solid col(fg, 100, 0.1);
		border-radius: calc(var(--radius) + var(--inset));
		max-width: var(--ui-width-main);
		// gap: 0.5em;
		// font-size: 1.2rem;
	}

	li {
		display: flex;
		flex-direction: row;
		padding: 0;
		margin: 0;
		align-items: center;
		&:first-of-type .sep {
			padding-left: 0.5em;
		}
	}

	span {
		position: relative;
		top: -0.1em;
	}

	.sep {
		user-select: none;
		opacity: 0.5;
	}

	a {
		color: col(fg, 000);
		cursor: pointer;
		text-transform: capitalize;
		padding: 0.5em 0.8em;
		font-weight: 300;
		border-radius: var(--radius);
		transition: all 0.2s var(--ui-ease-out);
		margin: 0;

		&:hover {
			color: col(primary, 900);
			background: col(primary, 300, 0.3);
		}
	}
</style>
