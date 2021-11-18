<script context="module" lang="ts">
	export async function load({ fetch }) {
		const res = await fetch('/api/projects.json');
		if (res.ok) {
			return {
				props: {
					projects: await res.json()
				}
			}
		}
	}
</script>

<script lang="ts">
	export let projects;
	console.log(projects);
	// const projects = fetch('/api/projects.json').json();
</script>


<h1>Projets</h1>
<section>
	#{#await projects}
		<p>Loading...</p>
	{:then projects}
		{#each projects as project}
			<p>{project.title}</p>
		{/each}
	{:catch error}
		<!-- projects was rejected -->
	{/await}
</section>


<style>

</style>