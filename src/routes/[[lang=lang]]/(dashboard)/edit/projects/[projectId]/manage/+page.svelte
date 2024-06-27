<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import ProjectDelete from './project-delete.svelte';
	import ProjectPublish from './project-publish.svelte';
	import ProjectShare from './project-share.svelte';

	let { data } = $props();
</script>

<DashboardSubHeader class="dashboard-header">
	<h2>{m.project_sharing_and_management()}</h2>
</DashboardSubHeader>
<ProjectPublish />
<ProjectShare />
<ProjectDelete />

<style>
	@import '$styles/scoped/dashboard';
</style>
