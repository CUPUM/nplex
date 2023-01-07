<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { fly } from 'svelte/transition';
</script>

<header>
	<hgroup>
		<h1 in:fly={{ y: 20 }}>Éditez une fiche</h1>
		<span in:fly={{ y: -10, delay: 250 }}>
			<Icon name="pen" style="top: -.15em" />&emsp;Choisissez le type de document que vous souhaitez
			créer ou modifier.
		</span>
	</hgroup>
</header>
<ul>
	<li class="project">
		<div class="edit">
			<a href="/" class="fill-link" role="presentation" />
			<a href="/" class="create">Créer un nouveau projet</a>
			<a href="/" class="modify">Modifier un projet existant</a>
		</div>
		<a class="edit descriptors" href="/">Éditer les descripteurs de projet</a>
	</li>
	<li class="edit">
		<a href="/" class="fill-link" role="presentation" />
		<a href="/" class="create">Créer une nouvelle organisation</a>
		<a href="/" class="modify">Modifier une organisation répertoriée</a>
	</li>
	<li class="edit">
		<a href="/" class="fill-link" role="presentation" />
		<a href="/" class="create">Créer une nouvelle organisation</a>
		<a href="/" class="modify">Modifier une organisation répertoriée</a>
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
			min-height: 50vh;
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
		padding: var(--ui-gutter);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
		gap: var(--ui-gutter);
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
		gap: 1px;
		border-radius: var(--ui-radius-lg);
		overflow: hidden;

		.edit {
			flex: 2;
			border-radius: 0;
		}

		.descriptors {
			flex: 1;
		}
	}

	.edit {
		position: relative;
		background: col(bg, 100);
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4rem;
		padding: 4rem;
		border-radius: var(--ui-radius-xl);
		font-size: var(--ui-text-xl);
		line-height: 1.2;
	}

	.descriptors {
	}

	.create {
		position: relative;
		z-index: 1;
	}

	.modify {
		position: relative;
		z-index: 1;
		display: inline-block;
		font-size: var(--ui-text-md);
		border: 1px solid col(fg, 500, 0.1);
		// background: col(fg, 500);
		// color: col(bg, 900);
		padding: 1.15em 1.75em 1.35em;
		border-radius: 99px;

		&:hover {
			background: col(fg, 500);
		}
	}
</style>
