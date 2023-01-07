<script lang="ts">
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import { EDITOR_ROUTES } from '$utils/routes';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { EDITABLES_HASHES } from './common';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<article>
	<header>
		<h1>Créer ou éditer une fiche</h1>
		<h2>Choisissez le type de document que vous souhaitez créer ou modifier.</h2>
	</header>
	<nav>
		{#if mounted}
			<section
				class="project {ICON_CLASSES.HOVER}"
				style:grid-area="project"
				in:fly={{ y: 20, delay: 0 }}
			>
				<a href={EDITOR_ROUTES.project.pathname}>
					<Icon name="pen-plus" class="icon" />
					<hr />
					<span class="label">Créer un nouveau<br /><em>projet</em></span>
				</a>
				<a href={EDITOR_ROUTES.descriptors.pathname}>
					<span>Gérer les descripteurs</span>
					<Icon name="parameters" />
				</a>
				<a href="#{EDITABLES_HASHES.PROJECTS}">
					Éditer
					<Icon name="file" />
				</a>
			</section>
			<a
				href={EDITOR_ROUTES.organisation.pathname}
				style:grid-area="organisation"
				in:fly={{ x: -20, delay: 150 }}
				class={ICON_CLASSES.HOVER}
			>
				<Icon name="pen-plus" class="icon" />
				<hr />
				<span>Créer une nouvelle<br /><em>organisation</em></span>
			</a>
			<a
				href={EDITOR_ROUTES.actor.pathname}
				style:grid-area="actor"
				in:fly={{ x: 20, delay: 300 }}
				class={ICON_CLASSES.HOVER}
			>
				<Icon name="pen-plus" class="icon" />
				<hr />
				<span>Créer un nouveau<br /><em>profil d'acteur</em></span>
			</a>
		{/if}
	</nav>
</article>

<style lang="scss">
	article {
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 4rem 2rem;
		font-size: var(--ui-text-xl);
		max-width: var(--ui-width-p);
	}

	h1 {
		font-weight: 600;
	}

	h2 {
		font-weight: 350;
		font-size: var(--ui-text-lg);
		line-height: 1.25;
	}

	nav {
		padding: var(--ui-gutter);
		display: grid;
		grid-template-areas:
			'project			project'
			'organisation	actor';
		width: 100%;
		max-width: var(--ui-width-main);
		gap: var(--ui-gutter);
	}

	.project {
		display: grid;
		grid-template-areas:
			'new	edit'
			'new	descriptors';
	}

	a {
		position: relative;
		display: flex;
		gap: 2rem;
		flex-wrap: nowrap;
		flex-direction: row;
		padding: 4rem;
		min-height: 30vh;
		align-items: center;
		justify-content: center;
		border: 1px dashed transparent;
		background: col(bg, 500);
		color: col(fg, 900);
		border-radius: var(--ui-radius-xl);
		line-height: 1;
		font-size: var(--ui-text-lg);
		transition: all 0.15s var(--ui-ease-out);

		&:hover {
			background: col(primary, 500);
		}

		hr {
			background: currentColor;
			opacity: 0.1;
			padding: 0.5px;
			align-self: stretch;
		}

		span {
			z-index: 1;
			font-weight: 350;
		}

		em {
			font-style: normal;
			z-index: 1;
			font-weight: 600;
			font-size: var(--ui-text-xl);
		}
	}
</style>
