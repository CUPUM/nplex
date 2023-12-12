<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../motion';

	export let data;
</script>

<article>
	<header>
		<h2 class="heading lg">
			<LangKey>{m.project_descriptors_ownershipTypes()}</LangKey>
		</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</header>
	<ul>
		{#each data.siteOwnerships as ownership, i (ownership.id)}
			<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
				<a class="descriptor" {...$link(`/edit/projects/descriptors/ownerships/${ownership.id}`)}>
					{ownership.title}
				</a>
			</li>
		{/each}
	</ul>
</article>
<slot />

<style lang="postcss">
</style>
