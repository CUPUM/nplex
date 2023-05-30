<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { fly } from 'svelte/transition';
	import { USER_ROUTES } from '../common';

	export let data;
</script>

<div class="account">
	<header>Test</header>
	<Sidebar>
		{#each Object.values(USER_ROUTES) as r, i}
			{@const current = $page.url.pathname === r.pathname || undefined}
			<SidebarButton {i} href={r.pathname}>
				<Icon name={r.icon} slot="leading" />
				{r.title}
			</SidebarButton>
		{/each}
	</Sidebar>
	<article in:fly={{ y: 10 }}>
		<slot />
	</article>
</div>

<style lang="scss">
	.account {
		position: relative;
		// display: flex;
		// flex-direction: row;
		display: grid;
		grid-template-areas:
			'header header'
			'sidebar article';
		grid-template-columns: max-content 1fr;
		// grid-template-columns: minmax(max-content, 1fr) minmax(auto, var(--ui-width-md)) minmax(0, 1fr);
		margin: 0 auto;
		gap: var(--ui-gutter-xs);
		align-items: flex-start;
		width: 100%;
		max-width: var(--ui-width-main);
		padding: var(--ui-gutter-md);
		padding-top: 0;
	}

	header {
		grid-area: header;
		min-height: 35vh;
		min-height: 35svh;
		padding: var(--ui-gutter-md);
		border-radius: var(--ui-radius-xl);
		background-color: col(bg, 500);
		// border: var(--ui-border-size) solid col(bg, 300);
	}

	article {
		grid-area: article;
		position: relative;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: var(--ui-gutter-xs);
		width: 100%;

		:global(.account-formgroup) {
			position: relative;
			color: col(fg, 100);
			padding: var(--ui-gutter-md);
			border-radius: var(--ui-radius-xl);
			// background-color: col(bg, 100);
			// border: var(--ui-border-size) solid col(bg, 000);
		}

		:global(.account-formgroup-title) {
			@include typography(heading, md);
			margin-top: -0.25em;
			margin-bottom: 2rem;
		}
	}
</style>
