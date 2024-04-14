<script lang="ts">
	export let data;
</script>

<section>
	<p class="text dimmer sm">To come</p>
	<ul>
		{#each data.likedProjects as project}
			{project.id}
		{/each}
	</ul>
</section>

<style>
	section {
		padding: 2rem;
	}
</style>
