<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { formid } from './common';
	import ProjectCostRange from './ProjectCostRange.svelte';
	import ProjectDescription from './ProjectDescription.svelte';
	import ProjectType from './ProjectType.svelte';
	import ProjectWorks from './ProjectWorks.svelte';

	export let data: PageData;
	export let form: ActionData;

	let formproject = { ...data.project };
	let typeTooltip = false;
</script>

<form
	id={formid}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<ProjectType {data} bind:formproject {typeTooltip} />
	<ProjectWorks {data} bind:formproject bind:typeTooltip />
	<ProjectCostRange {data} bind:formproject />
	<ProjectDescription {data} bind:formproject />
</form>

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		margin: 0 auto;
		gap: 0;
	}
</style>
