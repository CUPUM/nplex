<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="pb-xl px-padding px-padding flex w-full flex-col">
	<header class="prose prose-block top-sticky-top z-front max-w-main sticky w-full self-center">
		<h2>
			{m.description()}
		</h2>
	</header>
	<div class="prose max-w-main w-full self-center">
		<OptionalText text={data.project.description} fallback={m.no_description()} />
	</div>
</section>
