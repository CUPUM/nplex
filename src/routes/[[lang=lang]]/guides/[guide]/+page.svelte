<script lang="ts">
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';

	let { data } = $props();
</script>

<header class="p-padding min-h-main-full-height flex flex-col items-center justify-center">
	<hgroup class="max-w-main flex w-full flex-1 flex-col items-start justify-center">
		<h1 class="text-biggest text-base-accent max-w-md font-bold">
			<StaggerText
				text={data.title}
				translate="0 1em"
				opacity="0"
				clipPath={{ start: 'inset(0 0 -0.15em 0)', end: 'inset(0 0 -0.25em 0)' }}
			/>
		</h1>
	</hgroup>
</header>
<article class="prose pb-xl mx-auto">
	<svelte:component this={data.content} />
</article>
<nav
	class="p-input-nest bg-base/dim gap-gap max-w-main bottom-padding sticky flex w-full flex-row items-start self-center overflow-x-auto rounded-full text-sm backdrop-blur-md"
>
	{#each data.headings as heading, i}
		<a
			{...linkAttributes(`#${heading.id}`)}
			style:--i-heading={i}
			class="button button-ghost rounded-full"
			use:ripple
		>
			<StaggerText
				text={heading.value}
				translate="0 1em"
				duration="1000ms"
				clipPath={{ start: 'inset(0 0 -0.15em 0)', end: 'inset(0 0 -0.25em 0)' }}
				delay="calc(var(--i-heading) * 50ms + var(--i) * 25ms)"
			/>
		</a>
	{/each}
</nav>
