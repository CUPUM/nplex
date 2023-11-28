<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import Dashboard from '$lib/components/Dashboard.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import EditableProjects from './EditableProjects.svelte';

	export let data;
</script>

<Dashboard
	header={$page.data.dashboard?.header}
	sidebar={$page.data.dashboard?.sidebar}
	footer={$page.data.dashboard?.footer}
>
	<slot />
</Dashboard>
<aside>
	<section class="editables">
		<h2 class="heading lg">
			<LangKey>{m.myProjects()}</LangKey>
		</h2>
		<EditableProjects projects={data.streamed.editableProjects} />
	</section>
	<section class="editables">
		<h2 class="heading lg">
			<LangKey>{m.myOrgs()}</LangKey>
		</h2>
	</section>
</aside>

<style lang="postcss">
	.editables {
		h2 {
			margin: 2rem;
		}
	}

	.cards {
		padding: var(--base-gutter);
		display: flex;
		flex-direction: row;
		gap: var(--base-gutter);
		overflow-x: auto;
	}
</style>
