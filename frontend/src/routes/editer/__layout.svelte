<script lang="ts" context="module">
	import { guard } from '$utils/guard';
	import type { Load, LoadOutput } from '@sveltejs/kit';

	export const load: Load = async ({ session, url, fetch }): Promise<LoadOutput> => {
		// Make sure the client is at least an authed user (hence checking against 'allRoles').
		const res = await guard({ criteria: ['admin', 'editor', 'visitor'], session, fetch, url });
		return res;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import EditorAside from '$components/complexes/EditorAside.svelte';
	import { width } from '$transitions/width';
</script>

<div>
	{#if $page.stuff.showEditorAside}
		<aside transition:width|local>
			<EditorAside />
		</aside>
	{/if}
	<article>
		<slot />
	</article>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 0;
		padding-top: var(--navbar-height);
		overflow: hidden;
	}

	aside {
		flex: none;
		display: block;
		// background-color: var(--color-light-300);
		border-right: 1px solid rgba(var(--rgb-dark-500), 0.1);
		padding: 0 2rem;
	}

	article {
		display: block;
		flex: 1;
		margin: 0;
		min-width: 0;
	}
</style>
