<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import FieldReset from '$components/FieldReset.svelte';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import Image from '$components/Image.svelte';
	import { projectcolors, publicurl } from '$utils/database';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { EXPLORE_ROUTES } from '$utils/routes';
	import type { PageData } from './$types';

	export let projects: PageData['projects'];
	export let scrollTarget: HTMLElement;

	const heading = 'Explorer les projets';
</script>

<article bind:this={scrollTarget}>
	<header>
		<a class="heading {ICON_CLASSES.HOVER}" href={EXPLORE_ROUTES.projects.pathname}>
			<h2>{heading}</h2>
			<div class="icon">
				<Icon name="arrow-right" strokeWidth="4" />
			</div>
		</a>
		<form method="POST" use:enhance action="?/projects">
			<Field type="search" placeholder="Chercher des projets" variant="outlined">
				<FieldIcon name="search" slot="leading" />
				<FieldReset slot="trailing" />
			</Field>
		</form>
	</header>
	<ul>
		{#each projects as p (p.id)}
			<li>
				<a class="card" href="{EXPLORE_ROUTES.projects.pathname}/{p.id}">
					<Image
						alt=""
						src={publicurl(STORAGE_BUCKETS.PROJECTS, p.banner?.name)}
						class="image"
						color={projectcolors(p.gallery)}
					/>
					<section class="detail">
						<h1>{p.title}</h1>
						<p>&#9829;{p.likes_sum}</p>
					</section>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: var(--ui-nav-px);
	}

	header {
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--ui-gutter);
		padding-inline: var(--ui-gutter);
		margin-top: var(--ui-gutter);
	}

	form {
		width: 400px;
		max-width: 100%;
	}

	.heading {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.5em;
		position: relative;
		width: 100%;
		max-width: --ui-block;
		font-size: var(--ui-text-xl);
		font-weight: 500;
		transition: color 0.25s ease-out;

		.icon {
			opacity: 0;
			font-size: 0.5em;
			transform: translateX(-0.25em);
			transition: all 0.2s var(--ui-ease-out);
		}

		&:hover {
			color: col(primary, 500);
			.icon {
				transform: translateX(0);
				opacity: 1;
			}
		}
	}

	ul {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 0;
		height: 500px;
		overflow-x: scroll;
		justify-content: stretch;
		padding-block: var(--ui-gutter);
		padding-inline: max(
			var(--ui-gutter),
			calc(50vw + var(--ui-gutter) - 0.5 * var(--ui-width-main))
		);
	}

	li {
		position: relative;
		display: block;
		aspect-ratio: 3 / 4;
	}

	.card {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: var(--ui-radius-lg);
		transition: background 0.25s;

		:global(.image) {
			width: 100%;
			flex: 1;
			min-height: 0;
			border-radius: var(--ui-radius-lg);
		}

		&:hover {
			background: col(bg, 000);
		}
	}

	.detail {
		padding: 1rem;
	}

	h1 {
		font-weight: 600;
		font-size: var(--ui-text-lg);
	}
</style>
