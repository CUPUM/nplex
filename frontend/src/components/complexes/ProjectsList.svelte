<script>
	const projects = Array(12)
		.fill(null)
		.map((_) => {
			const id = Math.round(Math.random() * 1000).toString(6);
			return {
				id,
				title: 'Nom du projet ' + id,
			};
		});
</script>

<ul>
	{#each projects as p}
		<li>
			<a href="/projets/{p.id}">
				<div id="title">{p.title}</div>
			</a>
		</li>
	{/each}
	<li>Add project</li>
</ul>

<style>
	li {
	}
</style>
