<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="pb-xl px-padding px-padding flex w-full flex-col">
	<header class="prose prose-block top-sticky-top z-front sticky w-full max-w-xl self-center">
		<h2>
			{m.description()}
		</h2>
	</header>
	<div class="prose w-full max-w-xl self-center">
		<OptionalText text={data.project.description} fallback={m.no_description()} />
	</div>
</section>
