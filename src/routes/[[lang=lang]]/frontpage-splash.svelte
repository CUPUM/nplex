<script lang="ts">
	import Logo from '$lib/components/primitives/logo.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<header class="min-h-main-full-height p-padding pb-navbar-height flex items-center justify-center">
	<Logo height="10em" id="splash-logo" class="text-base-accent" />
</header>
