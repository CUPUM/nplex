<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { guard } from '$utils/routing/guards';
	// import type { Load } from '@sveltejs/kit';

	// export const load: Load = async ({ session, url, fetch }) => {
	// 	// Make sure the client is at least an authed user (hence checking against 'allRoles').
	// 	const res = await guard.role({ roles: ['admin', 'editor', 'visitor'], session, url });
	// 	return res;
	// };
</script>

<script lang="ts">
	import EditorProjectsList from '$components/complexes/EditorProjectsList.svelte';
	import Button from '$components/primitives/Button.svelte';
	import { slide } from 'svelte/transition';

	const targetForm = 'edit-form';
</script>

<div>
	<aside>
		<menu class="general">
			<Button form="sheet" icon="info-circle">Aide</Button>
		</menu>
		<menu class="form-controls" transition:slide>
			<Button form={targetForm} type="submit" icon="pen-plus" variant="ghost">Enregistrer</Button>
			<Button form={targetForm} type="reset" icon="trash" variant="ghost">Tout effacer</Button>
			<!-- If editing existing sheet, aka routeId = /editer/[someId], if admin or editor, etc... -->
			<Button form={targetForm} type="submit" icon="pen-plus" variant="ghost">Publier</Button>
			<!-- Add category-specific controls -->
		</menu>
		<h6>Projets</h6>
		<ul>
			<li>Projet 1...</li>
			<li>Projet 2...</li>
		</ul>
		<h6>Organisations</h6>
		<ul>
			<li>Fiche</li>
			<li>Fiche</li>
			<li>Fiche</li>
		</ul>
		<h6>Acteurs</h6>
		<ul>
			<li>Fiche</li>
			<li>Fiche</li>
			<li>Fiche</li>
		</ul>
	</aside>
	<article>
		<section>
			<slot />
		</section>
		<section>
			<EditorProjectsList />
			<!-- Other lists here -->
		</section>
	</article>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 0;
		// overflow: hidden;
	}

	aside {
		position: sticky;
		top: var(--navbar-height);
		flex: none;
		display: flex;
		flex-direction: column;
		height: 100%;
		border-right: 1px solid rgba(var(--rgb-dark-500), 0.1);
		padding: 0 2rem;
	}

	article {
		display: inline-block;
		flex: 1;
		margin: 0;
		min-width: 0;
	}

	menu {
		display: flex;
		flex-direction: column;
	}
</style>
