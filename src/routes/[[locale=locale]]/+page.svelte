<script lang="ts">
	export let data;
</script>

<h1>nplex</h1>

<!-- <header></header>
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
</article> -->

<style lang="postcss">
	/* @custom-selector: --dark [data-mode='dark']; */

	h1 {
		color: var(--color-primary-400);
	}

	:global(:--dark) h1 {
		color: green !important;
	}

	@media (--md) {
		h1 {
			color: red;
		}
	}
</style>
