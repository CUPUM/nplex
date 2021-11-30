<script context="module" lang="ts">
	// export async function load({ fetch }) {
	// 	const res = await fetch('/api/projects.json');
	// 	if (res.ok) {
	// 		return {
	// 			props: {
	// 				projects: await res.json()
	// 			}
	// 		}
	// 	}
	// }
</script>


<script lang="ts">
	import { supabase } from '$utils/database';

	async function getProjects() {
		const {data, error} = await supabase.from('projects').select('*');
		if (error) throw new Error(error.message);
		return data;
	}
</script>


<section>
	#{#await getProjects()}
		<p>Loading...</p>
	{:then data}
		{#each data as project}
			<p>{project.title}</p>
		{/each}
	{:catch error}
		<p>{error}</p>
	{/await}
</section>


<style>

</style>