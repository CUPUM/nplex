<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import ProjectsListNewCard from './ProjectsListNewCard.svelte';
</script>

<section>
	<ul class="projects" use:horizontalScroll={{}}>
		<li class="submit-card">
			<ProjectsListNewCard />
		</li>
		{#each Array(5).fill(null) as item, i}
			<li class="project-card">
				<a href="">
					Projet {i}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	.projects {
		position: relative;
		display: flex;
		flex-direction: row;
		// justify-content: center;
		gap: 3rem;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: visible;
		padding-block: 3rem;
		padding-inline: 4rem;

		li {
			flex: 0;
			position: relative;
			border-radius: 1.5rem;
			padding: 2rem;
			background-color: white;
			box-shadow: 0 1rem 3rem -2rem rgba(var(--rgb-dark-900), 0.25);
			aspect-ratio: 2 / 3;
			display: block;
			width: 33%;
			min-width: 300px;
			max-width: 500px;
		}

		.submit-card {
			background-color: transparent;
			border: 1.5px dashed rgba(var(--rgb-dark-500), 0.25);
			box-shadow: none;
		}
	}
</style>
