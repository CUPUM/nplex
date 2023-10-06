<script lang="ts">
	import { page } from '$app/stores';
	import { css } from 'styled-system/css';
	import { flex } from 'styled-system/patterns';
	import { token } from 'styled-system/tokens';
	import { fade } from 'svelte/transition';
</script>

<article
	class={css({
		display: 'grid',
		gridTemplateColumns: `fit-content(token(sizes.dashboard.navbar)) 1fr`,
		lg: {
			paddingInline: '1rem',
		},
	})}
>
	{#if $page.data.dashboard?.header}
		<header class={css({ gridColumn: '1 / -1' })}>Header</header>
	{/if}
	{#if $page.data.dashboard?.breadcrumbs}
		<div class={css({ gridColumn: '1 / -1' })}>Breadcrumbs</div>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<div
			class={flex({
				gridColumn: '1',
				flexDirection: 'row',
				alignSelf: 'stretch',
				overflowX: 'auto',
				top: token('sizes.navbar'),
				position: 'sticky',
				gap: '0.5rem',
				md: {
					width: 'dashboard.navbar',
					marginRight: '0.5rem',
					alignSelf: 'flex-start',
					overflowX: 'hidden',
					overflowY: 'auto',
					flexDirection: 'column',
				},
			})}
		>
			<svelte:component this={$page.data.dashboard.sidebar} />
		</div>
	{/if}
	<section
		in:fade
		class={css({
			gridColumn: '2 / 3',
			borderRadius: 'lg',
			backgroundColor: 'neutral.50',
			_dark: {
				backgroundColor: 'neutral.800',
			},
		})}
	>
		<slot />
	</section>
</article>
