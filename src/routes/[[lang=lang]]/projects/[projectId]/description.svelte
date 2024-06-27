<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="prose prose-block px-padding mb-xl w-full max-w-xl self-center">
	<h2>{m.description()}</h2>
	<OptionalText text={data.project.description} fallback={m.no_description()} />
</section>
