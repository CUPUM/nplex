<script lang="ts">
	import { page } from '$app/stores';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { USER_ROUTES } from '../common';
</script>

<div class="account">
	<menu>
		{#each Object.values(USER_ROUTES) as r}
			{@const current = $page.url.pathname === r.pathname || undefined}
			<a
				href={r.pathname}
				data-current={current}
				class="{ICON_CLASSES.HOVER} {current ? ICON_CLASSES.HOLD : ''}"
			>
				<Ripple />
				<i>
					<Icon name={r.icon} strokeWidth="2.5" />
				</i>
				{r.title}
			</a>
		{/each}
	</menu>
	<article>
		<slot />
	</article>
</div>

<style lang="scss">
	.account {
		--aside-width: 180px;
		position: relative;
		display: grid;
		// grid-template-columns: var(--aside-width) 1fr var(--aside-width);
		grid-template-columns: var(--aside-width) 1fr;
		margin: 0 auto;
		gap: var(--ui-gutter);
		align-items: flex-start;
		width: 100%;
		max-width: var(--ui-width-main);
		padding: 0 var(--ui-gutter);
	}

	menu {
		--radius: var(--ui-radius-md);
		display: flex;
		flex-direction: column;
		position: sticky;
		top: var(--ui-nav-px);
		gap: var(--ui-inset);
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
			color: col(bg, 700);
			background: col(fg, 500);
		}
	}

	article {
		position: relative;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: var(--ui-gutter);
		width: 100%;
	}
</style>
