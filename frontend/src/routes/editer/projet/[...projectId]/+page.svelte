<script lang="ts" context="module">
	export type LocalProject = PageData['project'] & {
		formDirty: Set<keyof PageData['project']>;
		formUpdated: string;
	};

	export type ProjectEditorContext = {
		localProject: Writable<LocalProject>;
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/primitives/Field.svelte';
	import Map from '$components/primitives/Map.svelte';
	import MapGeolocateControl from '$components/primitives/MapGeolocateControl.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
	import { persistWritable } from '$utils/persistStore';
	import { Ctx, LocalStorage } from '$utils/values/keys';
	import { sizes } from '$utils/values/sizes';
	import { setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { crossfade, slide } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import FormGroup from './FormGroup.svelte';
	import Header from './Header.svelte';
	import Toolbar from './Toolbar.svelte';

	export let data: PageData;
	export let form: ActionData;

	// Check local storage for persisted version, if not new, verify if based on up-to-date data.
	const key = data.isNew ? LocalStorage.NewProject : data.project.id;
	const fresh: LocalProject = { ...data.project, formDirty: new Set(), formUpdated: null };
	const localProject = persistWritable<LocalProject>(key, fresh);
	if (!data.isNew && $localProject.updated_at !== data.project.updated_at) {
		$localProject = fresh;
	}

	setContext<ProjectEditorContext>(Ctx.ProjectEditor, {
		localProject,
	});

	function trackDirtiness(key: keyof PageData['project']) {
		const dirty = data.project[key] !== localProject[key];
		if (dirty) {
			$localProject.formDirty = $localProject.formDirty.add(key);
			$localProject.formUpdated = Date.now().toString();
		} else {
			$localProject.formDirty.delete(key);
			$localProject.formDirty = $localProject.formDirty;
			if (!$localProject.formDirty.size) {
				$localProject.formUpdated = null;
			}
		}
	}

	const [send, receive] = crossfade({ fallback: slide });
</script>

<Header project={$localProject} isNew={data.isNew} />
<form action="?/update" on:submit={(e) => console.log(e)} use:enhance>
	<FormGroup key="title">
		<Field
			name="title"
			size={sizes.large}
			variant="outlined"
			bind:value={$localProject.title}
			on:change={() => trackDirtiness('title')}
		>
			<svelte:fragment slot="label">Nom du projet</svelte:fragment>
		</Field>
	</FormGroup>
	<FormGroup legend="Catégorie" key="category_id">
		<ul>
			{#each data.descriptors.categories as c}
				<li>
					<label>
						<input
							type="radio"
							bind:group={$localProject.category_id}
							name="category"
							value={c.id}
							required
						/>
						{c.title}
					</label>
				</li>
			{/each}
		</ul>
	</FormGroup>
	<FormGroup legend="Type" key="type_id">
		<ul>
			{#each data.descriptors.types.filter((t) => t.categories_ids.includes($localProject.category_id)) as t}
				<li out:send={{ key: t.id }} in:receive={{ key: t.id }}>
					<label>
						<input type="radio" bind:group={$localProject.type_id} name="type" value={t.id} required />
						{t.title}
					</label>
				</li>
			{/each}
		</ul>
	</FormGroup>
	<section class="map-container">
		<legend>Localisez</legend>
		<Map>
			<MapToolbar position="top-left" slot="top-left">
				<MapGeolocateControl />
			</MapToolbar>
		</Map>
	</section>
	<Toolbar />
</form>

<style lang="scss">
	form {
		@include mixins.core-grid;
		position: relative;
		border-radius: calc(3rem - 0.05 * var(--scrollpx));
		padding: 4rem 0;
		background-color: var(--bg-color);

		&::before {
			content: '';
			position: absolute;
			width: calc(100% - var(--scroll-size));
			height: 100vh;
			left: 0;
			top: 0;
			border-radius: inherit;
			background-color: var(--bg-color);
			margin-top: -2rem;
			transform: translateY(calc(-0.2 * var(--scrollpx)));
		}
	}
</style>
