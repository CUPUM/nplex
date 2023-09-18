<!--
	@component
	# Contexts
	Any singleton store should be provided app-wide or to component trees using the context API
	to avoid SSR store instanciations and potential cross-request (cross-client) leaks.

	@see https://github.com/sveltejs/kit/discussions/4339
-->
<script lang="ts" context="module">
	import { createLoading } from '$lib/actions/loading';
	import { defineContext } from '$lib/utils/context';
	import { createLoadingLocation } from '$lib/utils/loading-hrefs';

	const [getLoadingLocationNewProject, setLoadingLocationNewProject] = defineContext<
		ReturnType<typeof createLoadingLocation>
	>({});
	const [getLoadingNewProject, setLoadingNewProject] = defineContext<
		ReturnType<typeof createLoading>
	>({});
	export { getLoadingLocationNewProject, getLoadingNewProject };

	const [getLoadingLocationNewOrg, setLoadingLocationNewOrg] = defineContext<
		ReturnType<typeof createLoadingLocation>
	>({});
	const [getLoadingNewOrg, setLoadingNewOrg] = defineContext<ReturnType<typeof createLoading>>({});
	export { getLoadingLocationNewOrg, getLoadingNewOrg };
</script>

<script lang="ts">
	const loadingLocationNewProject = createLoadingLocation('/new/project', { strict: true });
	setLoadingLocationNewProject(loadingLocationNewProject);
	const loadingNewProject = createLoading({
		state: loadingLocationNewProject,
	});
	setLoadingNewProject(loadingNewProject);

	const loadingLocationNewOrg = createLoadingLocation('/new/organization', { strict: true });
	setLoadingLocationNewOrg(loadingLocationNewOrg);
	const loadingNewOrg = createLoading({
		state: loadingLocationNewOrg,
	});
	setLoadingNewOrg(loadingNewOrg);
</script>

<slot />
