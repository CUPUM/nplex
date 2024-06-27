<script lang="ts">
	import Logo from '$lib/components/primitives/logo.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<header
	class="p-lg flex min-h-[calc(0.5*var(--spacing-main-full-height))] items-center justify-center"
>
	<Logo height="10em" id="splash-logo" class="text-base-accent" />
</header>
