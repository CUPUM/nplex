<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { PageData } from './$types';

	let { organization }: { organization: PageData['results'][number] } = $props();
</script>

<a
	{...linkAttributes(`/edit/organizations/${organization.id}`)}
	use:ripple
	class="p-card-padding bg-card rounded-card relative flex h-full w-full cursor-pointer flex-col"
>
	<div class="font-semibold">
		<OptionalText text={organization.name} fallback={m.organization_unnamed()} />
	</div>
	{organization.id}
</a>
