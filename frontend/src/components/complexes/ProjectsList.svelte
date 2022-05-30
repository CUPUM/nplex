<script lang="ts">
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

<style lang="postcss">
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		text-indent: 0;
		width: 100%;
		display: grid;
		grid-template-columns: 100%;
		gap: 1rem;
	}

	li {
		position: relative;
		display: block;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 200px;
	}

	a {
		display: grid;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 2rem;
		border-radius: 2rem;
		background-color: transparent;
		box-shadow: inset 0 0 0 2px rgba(0, 0, 20, 0.05), 0 0 0 0 transparent;
		transition: all 0.15s ease-out;

		&:hover {
			background-color: white;
			box-shadow: inset 0 0 0 0px rgba(0, 0, 20, 0), 0 3rem 5rem -3rem rgba(0, 0, 20, 0.25);
		}
	}
</style>
