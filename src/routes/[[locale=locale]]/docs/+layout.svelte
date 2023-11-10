<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';

	export let data;
</script>

<main id="docs">
	<Sidebar>
		<header>
			<Logo size="1.5em" />
			<hr />
			<a class="header" {...$link('/docs')}>Docs</a>
		</header>
		{#each Object.keys(data.docs) as type}
			<SidebarGroup>
				<svelte:fragment slot="heading">
					<span class="type-title">
						{type}
					</span>
				</svelte:fragment>
				{#each data.docs[type] as doc}
					<SidebarItem href="/docs/{doc.slug}">
						{doc.title}
					</SidebarItem>
				{/each}
			</SidebarGroup>
		{/each}
	</Sidebar>
	<div class="content">
		<article class="prose">
			<slot />
		</article>
		<footer>
			<button class="button outlined square"><ArrowLeft class="button-icon" /></button>
			<button class="button outlined square"><ArrowRight class="button-icon" /></button>
		</footer>
	</div>
</main>

<style lang="postcss">
	#docs {
		display: flex;
		flex-direction: row;
		gap: var(--base-gap);
		padding: var(--base-gutter);
		padding-top: 0;
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		margin-block: 1rem;
		font-weight: 500;

		hr {
			border-right-width: var(--border-size);
			border-bottom-width: var(--border-size);
			border-color: currentColor;
			opacity: 0.25;
			display: block;
			align-self: stretch;
			height: unset;
		}
	}

	.type-title {
		text-transform: capitalize;
	}

	.content {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100svh;
		min-height: 100dvh;
	}

	article {
		flex: 1;
	}

	footer {
		font-size: var(--size-sm);
		padding: 1rem;
	}
</style>
