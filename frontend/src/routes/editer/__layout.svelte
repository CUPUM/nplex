<script lang="ts" context="module">
	import { guard } from '$utils/routeGuards';
	import type { Load, LoadOutput } from '@sveltejs/kit';

	export const load: Load = async ({ session, url, fetch }): Promise<LoadOutput> => {
		// Make sure the client is at least an authed user (hence checking against 'allRoles').
		const res = await guard.role({ roles: ['admin', 'editor', 'visitor'], session, url });
		return res;
	};
</script>

<script lang="ts">
</script>

<div>
	<!-- {#if $page.stuff.showEditorAside}
		<aside transition:width|local>
			<EditorAside />
		</aside>
	{/if} -->
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
		overflow: hidden;
	}

	aside {
		flex: none;
		display: inline-block;
		border-right: 1px solid rgba(var(--rgb-dark-500), 0.1);
		padding: 0 2rem;
	}

	article {
		display: inline-block;
		flex: 1;
		margin: 0;
		min-width: 0;
	}
</style>
