<script lang="ts">
	import * as m from '$i18n/messages';
	import { Construction } from 'lucide-svelte';

	let { data } = $props();
</script>

<article class="flex flex-1 flex-col items-center justify-center">
	<div
		class="bg-card/soft p-card-padding rounded-section p-section-padding gap-padding flex max-w-sm flex-col text-center"
	>
		<span class="opacity-softish">
			<Construction class="opacity-soft float-left" />
			{m.organizations()}
			<Construction class="opacity-soft float-right" />
		</span>
		<p class="opacity-soft">{m.coming_soon()}</p>
	</div>
</article>
