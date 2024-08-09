<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';

	let { data, children } = $props();
</script>

{@render children()}
<nav
	class="gap-gap mt-xl no-scrollbar relative flex flex-row overflow-x-auto px-[max(var(--spacing-padding),50%-var(--width-main)/2)]"
>
	{#each data.guides as guide, i (guide.slug)}
		<a
			class="group/card p-section-padding bg-card/soft rounded-section group/card duration-fast hover:bg-card relative aspect-[2/1] w-[50%] max-w-full min-w-sm flex-none backdrop-blur-md transition-all ease-out"
			href="/guides/{guide.slug}"
		>
			<div class="flex size-full flex-col gap-[1em]">
				<h1 class="group-hover/card:text-primary-accent text-2xl font-bold">
					{guide.title}
				</h1>
				<p class="opacity-soft leading-lg max-w-xs text-sm">
					<OptionalText text={guide.summary} fallback={m.no_summary()} />
				</p>
			</div>
		</a>
	{/each}
</nav>
