<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import DescriptorChip from '../DescriptorChip.svelte';
	import DescriptorList from '../DescriptorList.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../motion';

	export let data;
</script>

<article class="dashboard-section">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>
				<LangKey>{m.project_descriptors_ownership_types()}</LangKey>
			</h2>
			<p class="dim">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
				perferendis quis, minus iste commodi error nostrum tempora?
			</p>
		</hgroup>
	</header>
	<div class="dashboard-subsection">
		<DescriptorList>
			<li>
				<DescriptorChip create {...$link('/edit/projects/descriptors/ownerships/new')} />
			</li>
			{#each data.siteOwnerships as ownership, i (ownership.id)}
				<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
					<DescriptorChip
						{...$link(`/edit/projects/descriptors/ownerships/${ownership.id}`)}
						deleteAction="?/delete"
						deleteValue={ownership.id}
					>
						{ownership.title}
					</DescriptorChip>
				</li>
			{/each}
		</DescriptorList>
	</div>
</article>
<slot />

<style lang="postcss">
	@import '$styles/scoped/dashboard.css';
</style>
