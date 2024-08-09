<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import Filters from './filters.svelte';

	let { data } = $props();
</script>

<div class="px-padding mb-lg min-h-main-full-height flex flex-1 flex-row items-start">
	<Filters lists={data.lists} />
	<ul>
		{#each data.result as organization}
			<li>
				<OptionalText text={organization.name} fallback={m.organization_unnamed()} />
			</li>
		{/each}
	</ul>
</div>
