<script lang="ts">
	import * as m from '$i18n/messages';
	import DottedBackground from '$lib/components/primitives/dotted-background.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';
	import { withLang } from '$lib/i18n/location';

	let { data, children } = $props();
</script>

{@render children()}
<header
	class="p-padding flex min-h-[calc(var(--spacing-main-full-height)/2-var(--spacing-navbar-height))] flex-col items-center justify-center"
>
	<h1 class="text-biggest text-base-accent max-w-main w-full font-bold">
		<StaggerText
			text={m.guides()}
			translate="0 1em"
			separator=""
			clipPath={{ start: 'inset(0em)', end: 'inset(-0.25em)' }}
		/>
	</h1>
</header>
<nav
	class="gap-padding py-xl relative flex flex-row overflow-x-auto px-[max(var(--spacing-padding),50%-var(--width-xl)/2)]"
>
	<DottedBackground class="opacity-dimmest bg-center" />
	{#each data.guides as guide, i (guide.slug)}
		<a class="bg-card p-lg aspect-[2/3] w-sm rounded-lg" href={withLang(`/guides/${guide.slug}`)}>
			{@html guide.title}
		</a>
	{/each}
</nav>
