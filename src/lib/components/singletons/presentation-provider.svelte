<script lang="ts" context="module">
	let source = $state(PRESENTATION_DEFAULT);
	let overwrite = $state<Presentation>();
	let resolved = $derived(overwrite ?? source);

	export const presentation = {
		get source() {
			return source;
		},
		get overwrite() {
			return overwrite;
		},
		set overwrite(value: Presentation | undefined) {
			overwrite = value;
		},
		reset() {
			overwrite = undefined;
			return resolved;
		},
		get resolved() {
			return resolved;
		},
	};
</script>

<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { PRESENTATION_DEFAULT } from '$lib/presentation/constants';
	import { Presentation } from 'lucide-svelte';

	onNavigate(() => {
		overwrite = undefined;
	});

	$effect(() => {
		source = $page.data.presentation;
		document.documentElement.setAttribute('data-presentation', resolved as string);
	});
</script>
