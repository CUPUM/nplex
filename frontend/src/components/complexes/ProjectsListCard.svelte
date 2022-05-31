<script lang="ts">
	import { intersection } from '$actions/intersection';
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import type { Project } from '$stores/projects';
	import { colors } from '$utils/colors';
	import { Ctx } from '$utils/contexts';
	import { getContext } from 'svelte';
	import type { ExploreListContext } from './ExploreList.svelte';

	export let project: Project;
	export let imageLoading = true;

	const ctx = getContext<ExploreListContext>(Ctx.ExploreList);

	let entered = false;

	function handleEnter() {
		console.log('entered');
		entered = true;
	}

	function handleImageLoad() {
		imageLoading = false;
	}

	function handleEnterCurrent() {
		console.log(project.id);
	}
</script>

<li use:intersection={{ rootMargin: '0% 0% 0%' }} on:enter on:leave on:enter|once={handleEnter}>
	<a href="/projets/{project.id}" use:intersection={{ rootMargin: '-50% 0% -50%' }} on:enter={handleEnterCurrent}>
		<figure class:loading={imageLoading}>
			{#if imageLoading}
				<Loading color={colors.dark[100]} />
			{/if}
			{#if entered}
				<img src={project.image_url} alt="" on:load={handleImageLoad} />
			{/if}
		</figure>
		<h3 id="title">{project.title}</h3>
		<Button style="grid-area: button;" iconPosition="after">
			<Icon name="submit" slot="icon" />
			Consulter
		</Button>
	</a>
</li>

<style lang="postcss">
	li {
		position: relative;
		display: block;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	a {
		text-decoration: none;
		display: grid;
		gap: 12px;
		grid-template-areas:
			'image	title	title	title'
			'image	summary	cost	cost'
			'image	summary	tokens	button';
		grid-auto-flow: dense;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 1rem;
		border-radius: 2rem;
		box-shadow: inset 0 0 0 2px rgba(0, 0, 20, 0.05), 0 0 0 0 transparent;
		color: var(--color-dark-500);
		transition: all 0.15s ease-out;

		&:hover {
			color: var(--color-dark-900);
			background-color: white;
			box-shadow: inset 0 0 0 0px rgba(0, 0, 20, 0), 0 3rem 5rem -3rem rgba(0, 0, 20, 0.25);

			& img {
				transform: scale(1);
			}
		}
	}

	figure {
		grid-area: image;
		position: relative;
		padding: 0;
		margin: 0;
		width: 200px;
		height: 200px;
		overflow: hidden;
		border-radius: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.5s cubic-bezier(0.5, 0, 0, 1);

		&.loading {
			transform: scale(0.9);

			& img {
				opacity: 0;
			}
		}
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.35s;
		transform: scale(1.1);
	}

	h3 {
		font-size: var(--size-large);
		font-weight: 500;
	}
</style>
