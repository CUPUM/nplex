<script lang="ts">
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import ProjectsFilter from './ProjectsFilter.svelte';
</script>

<ProjectsFilter key="costRange">
	<svelte:fragment slot="title">Fourchette de coûts</svelte:fragment>
	<Range min="0" max="20000">
		<RangeGroup />
	</Range>
</ProjectsFilter>

<style lang="scss">
</style>
