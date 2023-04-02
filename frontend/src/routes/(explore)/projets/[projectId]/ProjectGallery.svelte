<script lang="ts">
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<h2 class="project-section-title">Gallery</h2>
	<div>
		<ol>
			{#each project.gallery as img}
				<li>
					{img.title}
				</li>
			{/each}
		</ol>
		<menu>{'<-'} ... -></menu>
	</div>
</section>

<style lang="scss">
</style>
