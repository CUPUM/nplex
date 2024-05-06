<script lang="ts">
	import { ripple } from '$lib/actions/ripple.svelte.js';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import { File } from 'lucide-svelte';

	export let data;

	let mounted = false;

	// onMount(() => {
	// 	mounted = true;
	// });
</script>

<div class="flex flex-col items-start gap-[1em]">
	<button class="button" use:ripple>
		<Spinner />
		<File />
		Default
	</button>
	<button class="button button-outlined" use:ripple>
		<!-- <Spinner /> -->
		Outlined
	</button>
	<button class="button button-ghost" use:ripple>
		<!-- <Spinner /> -->
		Ghost
	</button>
	<button class="button button-cta" use:ripple>
		<!-- <Spinner /> -->
		Call to action
	</button>
	<button class="button button-link" use:ripple>Link</button>
</div>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit cupiditate pariatur harum, possimus
sit mollitia vitae sunt ratione voluptatem qui!

<style>
</style>
