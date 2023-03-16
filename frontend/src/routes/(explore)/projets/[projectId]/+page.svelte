<script lang="ts">
	import ProjectGallery from './ProjectGallery.svelte';
	import ProjectHeader from './ProjectHeader.svelte';
	import ProjectSummary from './ProjectSummary.svelte';

	export let data;
</script>

<article>
	<ProjectHeader />
	<ProjectSummary />
	<ProjectGallery />
</article>
<aside class="border-top">
	<header>Vous aimerez peut-être aussi:</header>
	<div>
		<section>Suggestions de projets</section>
		<section>Organisations</section>
		<section>Acteurs</section>
	</div>
</aside>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
	}
</style>
