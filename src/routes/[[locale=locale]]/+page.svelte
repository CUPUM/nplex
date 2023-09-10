<script lang="ts">
	export let data;
</script>

<header></header>
<article>
	<h2>Projects</h2>
	<section>
		<h3>Featured</h3>
		<ul></ul>
	</section>
	{#await data.editable.projects}
		...
	{:then editableProjects}
		<section>
			<h3>Mine</h3>
			<ul></ul>
		</section>
	{/await}
</article>
<article>
	<h2>Organizations</h2>
	<section>
		<h3>Featured</h3>
		<ul></ul>
	</section>
	{#await data.editable.organizations}
		...
	{:then editableOrganizations}
		<section>
			<h3>Mine</h3>
			<ul></ul>
		</section>
	{/await}
</article>

<style lang="scss">
</style>
