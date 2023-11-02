<script lang="ts">
	export let data;
</script>

<section>
	<ul>
		{#each data.likedProjects as project}
			{project.id}
		{/each}
	</ul>
</section>

<style lang="postcss">
</style>
