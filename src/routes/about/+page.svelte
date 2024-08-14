<script lang="ts">
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';

	let { data } = $props();
</script>

<header
	class="px-padding min-h-main-full-height flex flex-col items-center justify-center pb-[calc(var(--spacing-xl)+var(--spacing-navbar-height))]"
>
	<hgroup class="max-w-main flex w-full flex-col items-start">
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
<article class="prose mx-auto max-w-md">
	<data.content />
</article>
