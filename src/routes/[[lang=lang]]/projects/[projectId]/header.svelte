<script lang="ts">
	import * as m from '$i18n/messages';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import StaggerText from '$lib/components/primitives/stagger-text.svelte';
	import { projectCardCrossfade } from '$lib/motion/presets';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<header
	class="flex flex-col items-stretch"
	in:projectCardCrossfade.receive|global={{ key: data.project.id }}
>
	<hgroup
		class="px-padding min-h-main-full-height pb-sticky-top max-w-main flex w-full flex-col justify-center self-center"
	>
		<h1 class="text-biggest font-bold">
			<OptionalText text={data.project.title} fallback={m.project_untitled()}>
				{#snippet render(text)}
					<StaggerText
						{text}
						translate="0 1em"
						opacity="0"
						separator=""
						delay="calc(var(--i) * 10ms)"
						easing="var(--transition-timing-function-out)"
						clipPath={{ start: 'inset(0 -0.15em)', end: 'inset(0 -0.25em)' }}
					/>
				{/snippet}
			</OptionalText>
		</h1>
	</hgroup>
</header>
