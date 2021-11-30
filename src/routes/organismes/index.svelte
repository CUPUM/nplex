<script lang="ts">
	import { supabase } from '$utils/database';

	async function getProjects() {
		const {data, error} = await supabase.from('organizations').select('*');
		if (error) throw new Error(error.message);
		return data;
	}
</script>


<section>
	#{#await getProjects()}
		<p>Loading...</p>
	{:then data}
		{#each data as org}
			<p>{org.name}</p>
		{/each}
	{:catch error}
		<p>{error}</p>
	{/await}
</section>