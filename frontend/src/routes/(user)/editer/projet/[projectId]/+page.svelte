<script lang="ts">
	import { enhance } from '$app/forms';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import type { ActionData, PageData } from './$types';
	import { FORMID } from './common';
	import ProjectCostRange from './ProjectCostRange.svelte';
	import ProjectDescription from './ProjectDescription.svelte';
	import ProjectType from './ProjectType.svelte';
	import ProjectWorks from './ProjectWorks.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if (form) {
		messages.dispatch({ content: 'Projet mis à jour avec succès', type: 'success' });
	}
</script>

<form
	id={FORMID}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<ProjectDescription {data} />
	<ProjectType {data} />
	<ProjectWorks {data} />
	<ProjectCostRange {data} />
</form>

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		margin: 0 auto;
		margin-top: 1px;
		gap: 2px;
	}
</style>
