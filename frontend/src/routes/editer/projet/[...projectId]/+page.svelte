<script lang="ts" context="module">
	export type FormProject = PageData['project'] & {
		/**
		 * Form update dirty values tracking.
		 */
		_dirty: Set<keyof PageData['project']>;
		/**
		 * Form update time tracking.
		 */
		_updated_at: string;
	};

	export type ProjectEditorContext = {
		freshProject: FormProject;
		formProject: Writable<FormProject>;
		descriptors: PageData['descriptors'];
		trackDirty: (dirty: boolean, key: KeyOfSet<FormProject['_dirty']>) => void;
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';

	import type { KeyOfSet } from '$types/helpers';
	import { Ctx, LocalStorage } from '$utils/keys';
	import { persistWritable } from '$utils/persist';
	import { setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';
	import FormGroupCategory from './FormGroupCategory.svelte';
	import FormGroupCost from './FormGroupCost.svelte';
	import FormGroupLocation from './FormGroupLocation.svelte';
	import FormGroupTitle from './FormGroupTitle.svelte';
	import FormGroupType from './FormGroupType.svelte';
	import FormToolbar from './FormToolbar.svelte';
	import Header from './Header.svelte';

	export let data: PageData;

	// Check local storage for persisted version, if not new, verify if based on up-to-date data.
	const key = data.isNew ? LocalStorage.NewProject : data.project.id;
	const freshProject: FormProject = { ...data.project, _dirty: new Set(), _updated_at: null };
	const formProject = persistWritable<FormProject>(key, freshProject);
	if (!data.isNew && $formProject._updated_at !== data.project.updated_at) {
		$formProject = freshProject;
	}

	function reset() {
		$formProject = { ...freshProject };
	}

	function submit() {}

	function trackDirty(input: any, key: KeyOfSet<FormProject['_dirty']>) {
		if (input !== freshProject[key]) {
			$formProject._dirty.add(key);
		} else {
			$formProject._dirty.delete(key);
		}
		// Keeping track of the form update time accordingly.
		$formProject._updated_at = $formProject._dirty.size ? Date.now().toString() : null;
	}

	setContext<ProjectEditorContext>(Ctx.ProjectEditor, {
		freshProject,
		formProject,
		descriptors: data.descriptors,
		trackDirty,
	});
</script>

<Header isNew={data.isNew} />
<form on:reset|preventDefault={reset} use:enhance>
	<FormGroupTitle />
	<FormGroupCategory />
	<FormGroupType />
	<FormGroupCost />
	<FormGroupLocation />
	<FormToolbar />
</form>

<style lang="scss">
	// form {
	// 	@include mixins.core-grid;
	// 	position: relative;
	// 	border-radius: calc(3rem - 0.05 * var(--scrollpx));
	// 	padding: 4rem 0;
	// 	row-gap: 2rem;
	// 	background-color: var(--bg-color);

	// 	&::before {
	// 		content: '';
	// 		position: absolute;
	// 		width: calc(100% - var(--scroll-size));
	// 		height: 100vh;
	// 		left: 0;
	// 		top: 0;
	// 		border-radius: inherit;
	// 		background-color: var(--bg-color);
	// 		margin-top: -2rem;
	// 		transform: translateY(calc(-0.2 * var(--scrollpx)));
	// 	}
	// }
</style>
