<script lang="ts" context="module">
	import { allRoles } from '$utils/user';
	import type { Load, LoadOutput } from '@sveltejs/kit';

	export const load: Load = async ({ session, url }): Promise<LoadOutput> => {
		// Make sure the client is at least an authed user
		const res = await guard({ criteria: allRoles, session, url });
		return res;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import EditorAside from '$components/complexes/EditorAside.svelte';
	import { width } from '$transitions/width';
	import { guard } from '$utils/auth';
</script>

<div>
	{#if $page.stuff.showEditorAside}
		<section class="aside-container" transition:width|local>
			<EditorAside />
		</section>
	{/if}
	<article>
		<slot />
	</article>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 100%;
		gap: 0;
		padding-top: var(--navbar-height);
	}

	section {
		flex: none;
		display: block;
		position: relative;
		height: 100%;
		background-color: red;
	}

	article {
		display: block;
		flex: 0;
		margin: 0;
		padding: 2rem;
	}
</style>
