<script lang="ts">
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';

	let { data } = $props();
</script>

<header
	class="p-xl min-h-main-full-height flex flex-col items-center justify-center pb-[calc(var(--spacing-xl)+var(--spacing-navbar-height))]"
>
	<section class="prose leading-sm gap-gutter flex w-full max-w-xl flex-row">
		<h1 class="flex-1">
			<StaggerText
				text={data.title}
				separator=""
				translate="0 1em"
				opacity="0"
				maskPadding={{ start: '0.1em', end: '0.25em' }}
			/>
		</h1>
		<nav class="gap-gutter flex flex-1 flex-col">
			{#each data.headings as heading, i}
				<a href="#{heading.id}" style:--i-heading={i} class="text-lg">
					<StaggerText
						text={heading.value}
						translate="0 1em"
						duration="1000ms"
						maskPadding={{ start: '0.05em', end: '0.15em' }}
						delay="calc(var(--i-heading) * 50ms + var(--i) * 25ms)"
					/>
				</a>
			{/each}
		</nav>
	</section>
</header>
<article class="prose mx-auto max-w-md">
	<svelte:component this={data.content} />
</article>
