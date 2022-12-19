<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import { EDITOR_ROUTES } from '$utils/routes';
	import { EDITABLES_HASHES } from './(user)/common';

	let loading: string | null = null;

	beforeNavigate(({ to }) => {
		// if (to && editRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
		// 	loading = to.url.pathname;
		// }
	});

	afterNavigate(() => {
		loading = null;
	});
</script>

<ul class="meta">
	<li class="section projects">
		<a class="title" href={EDITOR_ROUTES.project.pathname}>Projets</a>
		<ul>
			<li>
				<a class="button" href={EDITOR_ROUTES.project.pathname}>
					<span>Créer un nouveau projet</span>
					<Icon name="plus" />
				</a>
			</li>
			<li>
				<a class="button" href="{EDITOR_ROUTES.project.pathname}#{EDITABLES_HASHES.projects}">
					<span>Modifier un projet</span>
					<Icon name="file" />
				</a>
			</li>
			<li>
				<a class="button" href={EDITOR_ROUTES.project.pathname + '/descripteurs'}>
					<span>Gérer les descripteurs</span>
					<Icon name="parameters" />
				</a>
			</li>
		</ul>
	</li>
	<li class="section">
		<a class="title" href={EDITOR_ROUTES.organisation.pathname}>Organisations</a>
		<ul>
			<li>
				<a class="button" href="">
					<span> Créer une organisation </span>
				</a>
			</li>
			<li>
				<a class="button" href="">
					<span> Modifier une organisation </span>
				</a>
			</li>
		</ul>
	</li>
	<li class="section">
		<a class="title" href={EDITOR_ROUTES.actor.pathname}>Acteurs</a>
		<ul>
			<li>
				<a class="button" href="">
					<span> Créer un profil d'acteur </span>
				</a>
			</li>
			<li>
				<a class="button" href="">
					<span> Modifier un profil d'acteur </span>
				</a>
			</li>
		</ul>
	</li>
</ul>

<style lang="scss">
	.meta {
		display: grid;
		grid-template-columns: minmax(1fr, auto) minmax(1fr, auto);
		position: relative;
		gap: 1rem;
		color: col(fg, 500);
	}

	.section {
	}

	.title {
		display: inline-flex;
		border-radius: inherit;
		font-weight: 600;
		font-size: var(--ui-text-xl);
		margin: 0.5rem 1rem;
	}

	.button {
		display: flex;
		flex-direction: row;
		padding: 1em 1.5em;
		gap: 0.5em;
		align-items: center;
		justify-content: center;
		background: col(fg, 900, 0.1);
		height: var(--ui-height);
		flex-wrap: nowrap;
		white-space: nowrap;
		border-radius: var(--ui-radius-md);
		> span {
			height: 1.5em;
		}
	}

	.projects {
		width: 100%;
		display: inline-flex;
		grid-column: 1 / -1;
		flex-direction: column;
	}

	.projects ul {
		display: flex;
		flex-direction: row;
		gap: 3px;
	}
</style>
