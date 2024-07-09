<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { withLang } from '$lib/i18n/location';

	let { data, children } = $props();
</script>

{@render children()}
<nav
	class="gap-padding py-xl no-scrollbar mt-xl bg-dotted from-current/softer relative flex flex-row overflow-x-auto px-[max(var(--spacing-padding),50%-var(--width-main)/2)]"
>
	{#each data.guides as guide, i (guide.slug)}
		<a
			class="group/card p-section-padding bg-base rounded-section group/card duration-fast hover:bg-card/soft relative aspect-[2/1] w-[50%] max-w-full min-w-sm flex-none backdrop-blur-md transition-all ease-out"
			href={withLang(`/guides/${guide.slug}`)}
		>
			<div class="flex size-full flex-col gap-[1em]">
				<h1 class="group-hover/card:text-primary-accent text-2xl font-bold">
					{guide.title}
				</h1>
				<p class="opacity-soft leading-md">
					<OptionalText text={guide.summary} fallback={m.no_summary()} />
				</p>
			</div>
		</a>
	{/each}
</nav>
