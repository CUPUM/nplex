<script lang="ts">
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';

	let { data } = $props();
</script>

<header
	class="p-xl min-h-main-full-height flex flex-col items-center justify-center pb-[calc(var(--spacing-xl)+var(--spacing-navbar-height))]"
>
	<hgroup class="prose leading-sm w-full max-w-xl">
		<h1>
			<StaggerText
				text={data.title}
				translate="0 1em"
				opacity="0"
				maskPadding={{ start: '0.1em', end: '0.25em' }}
			/>
		</h1>
	</hgroup>
</header>
<article class="prose mx-auto max-w-md">
	<svelte:component this={data.content} />
</article>
