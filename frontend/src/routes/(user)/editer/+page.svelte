<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { EDITOR_ROUTES } from '$utils/routes';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<article>
	<header>
		<h1>Créer un nouvelle fiche</h1>
		<h2>Choisissez le type du document que vous souhaitez créer.</h2>
	</header>
	<nav>
		{#if mounted}
			<a
				href={EDITOR_ROUTES.project.pathname}
				style:grid-area="project"
				in:fly={{ y: 20, delay: 0 }}
			>
				<Icon name="pen-plus" class="icon" strokeWidth="1" scaleStroke />
				<span>Créer un nouveau</span>
				<em>projet</em>
			</a>
			<a
				href={EDITOR_ROUTES.organisation.pathname}
				style:grid-area="organisation"
				in:fly={{ x: -20, delay: 150 }}
			>
				<Icon name="pen-plus" class="icon" strokeWidth="1" scaleStroke />
				<span>Créer une nouvelle</span>
				<em>organisation</em>
			</a>
			<a href={EDITOR_ROUTES.actor.pathname} style:grid-area="actor" in:fly={{ x: 20, delay: 300 }}>
				<Icon name="pen-plus" class="icon" strokeWidth="1" scaleStroke />
				<span>Créer un nouveau</span>
				<em>profil d'acteur</em>
			</a>
		{/if}
	</nav>
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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

	a {
		position: relative;
		z-index: 0;
		display: flex;
		gap: 0.5rem;
		flex-wrap: nowrap;
		flex-direction: column;
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
		transition: all 0.1s var(--ui-ease-out);

		&:hover {
			background: col(primary, 300);
			border: 1px dashed col(primary, 300, 0.2);
			border-radius: var(--ui-radius-lg);
			color: col(bg, 300);

			:global(.icon) {
				transform: scale(0.9);
			}
		}
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
		// text-transform: uppercase;
	}

	a :global(.icon) {
		z-index: 0;
		position: absolute;
		align-self: center;
		justify-self: center;
		font-size: 200px;
		opacity: 0.05;
		color: col(fg, 500);
		transition: all 0.1s;
	}
</style>
