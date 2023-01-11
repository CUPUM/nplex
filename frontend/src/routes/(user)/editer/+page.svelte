<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import { EDITOR_ROUTES } from './common';
</script>

<header>
	<hgroup>
		<h1 in:fly={{ y: 20 }}>Éditez une fiche</h1>
		<span in:fly={{ y: -10, delay: 250 }}>
			<Icon name="pen" style="top: -.15em" />&emsp;Choisissez le type de données que vous souhaitez
			créer ou modifier.
		</span>
	</hgroup>
</header>
<ul>
	<li class="block project" in:fade={{ delay: 0 }}>
		<div class="group">
			<a href={EDITOR_ROUTES.project.pathname} class="fill-link" role="presentation" />
			<a href={EDITOR_ROUTES.project.pathname} class="main-link">Créer un nouveau projet</a>
			<a href={EDITOR_ROUTES.project.edit.pathname} class="modify">Modifier un projet existant</a>
		</div>
		<hr />
		<a class="main-link group descriptors" href={EDITOR_ROUTES.project.descriptors.pathname}
			>Éditer les descripteurs de projet</a
		>
	</li>
	<li class="block group" in:fade={{ delay: 100 }}>
		<a href={EDITOR_ROUTES.organisation.pathname} class="fill-link" role="presentation" />
		<a href={EDITOR_ROUTES.organisation.pathname} class="main-link"
			>Créer une nouvelle organisation</a
		>
		<a href={EDITOR_ROUTES.organisation.edit.pathname} class="modify">Modifier une organisation</a>
	</li>
	<li class="block group" in:fade={{ delay: 200 }}>
		<a href={EDITOR_ROUTES.actor.pathname} class="fill-link" role="presentation" />
		<a href={EDITOR_ROUTES.actor.pathname} class="main-link">Créer un nouveau profil d'acteur</a>
		<a href={EDITOR_ROUTES.actor.edit.pathname} class="modify">Modifier un profil d'acteur</a>
	</li>
</ul>

<style lang="scss">
	header {
		padding: var(--ui-gutter);
		width: 100%;
		max-width: var(--ui-width-main);
		align-self: center;

		hgroup {
			width: 100%;
			max-width: var(--ui-width-lg);
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			align-items: center;
			justify-content: center;
			// min-height: 50vh;
		}

		h1 {
			text-align: center;
			font-size: var(--ui-text-2xl);
			font-weight: 600;
		}

		span {
			display: block;
			font-weight: 300;
			line-height: 1.25;
			letter-spacing: 0.2px;
			font-size: var(--ui-text-md);
		}
	}

	ul {
		width: 100%;
		max-width: var(--ui-width-md);
		padding: var(--ui-gutter);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
		gap: var(--ui-gutter);
		font-weight: 500;
	}

	.block {
		background: col(bg, 300);
		border-radius: var(--ui-radius-xl);
		font-size: var(--ui-text-lg);
		transition: all 0.15s ease-out;
		&:hover {
			background: col(primary, 300);
			color: col(fg, 300);
			box-shadow: 0 1rem 7rem -3rem col(primary, 900, 0.5);
		}
	}

	.fill-link {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.project {
		width: 100%;
		display: flex;
		flex-direction: row;
		border-radius: var(--ui-radius-xl);
		overflow: hidden;
		.edit {
			flex: 1;
			border-radius: 0;
		}
		.descriptors {
			display: flex;
			// justify-content: center;
			// font-size: 0.75em;
			flex: 1;
		}
	}

	.group {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4rem;
		padding: 4rem;
		line-height: 1.2;
	}

	a:not(.modify) {
		text-decoration-line: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 0.3em;
		text-decoration-skip-ink: none;
		transition: 0.25s;

		&:hover {
			text-decoration-color: col(primary, 700);
		}
	}

	.main-link {
		position: relative;
		z-index: 1;
	}

	.modify {
		position: relative;
		z-index: 1;
		display: inline-block;
		font-size: var(--ui-text-md);
		border: 1px solid col(fg, 500, 0.1);
		padding: 1em 1.5em 1.25em;
		border-radius: var(--ui-radius-md);
		font-weight: 400;
		transition: background 0.25s ease-out;

		&:hover {
			background: col(bg, 300);
			color: col(primary, 700);
			border: 1px solid transparent;
		}
	}
</style>
