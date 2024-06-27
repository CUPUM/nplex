<script lang="ts">
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';

	let { data } = $props();
</script>

<header
	class="p-xl min-h-main-full-height flex flex-col items-center justify-center pb-[calc(var(--spacing-xl)+var(--spacing-navbar-height))]"
>
	<div class="gap-gutter flex w-full max-w-xl flex-row items-center justify-center">
		<hgroup class="flex flex-1 flex-row">
			<h1 class="text-biggest text-base-accent font-bold">
				<StaggerText
					text={data.title}
					separator=""
					translate="0 1em"
					opacity="0"
					clipPath={{ start: 'inset(0 0 -0.15em 0)', end: 'inset(0 0 -0.25em 0)' }}
				/>
			</h1>
		</hgroup>
		<nav class="flex flex-1 flex-col items-start">
			{#each data.headings as heading, i}
				<a
					{...linkAttributes(`#${heading.id}`)}
					style:--i-heading={i}
					class="button button-link"
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
	</div>
</header>
<article class="prose pb-xl mx-auto">
	<svelte:component this={data.content} />
</article>
