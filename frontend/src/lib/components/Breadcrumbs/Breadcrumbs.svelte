<script lang="ts" context="module">
</script>

<script lang="ts">
	import BreadcrumbsSegment from './BreadcrumbsSegment.svelte';

	import BreadcrumbsSeparator from './BreadcrumbsSeparator.svelte';

	/**
	 * Pathname to use as root/base for all breadcrumbs.
	 */
	export let root: string;
</script>

<ol>
	<BreadcrumbsSegment>
		<slot name="root" />
	</BreadcrumbsSegment>
	<BreadcrumbsSeparator />
	<slot />
</ol>

<style lang="scss">
</style>
