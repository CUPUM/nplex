<script lang="ts">
	import { ripple } from '$lib/actions/ripple.svelte.js';

	export let data;

	let mounted = false;

	// onMount(() => {
	// 	mounted = true;
	// });
</script>

<div class="flex flex-col items-start gap-[1em]">
	{['default', 'outlined', 'dashed', 'ghost', 'cta', 'link']}
	<button class="button" use:ripple>Default</button>
	<button class="button button-bordered" use:ripple>Outlined</button>
	<button class="button button-dashed" use:ripple>Dashed</button>
	<button class="button button-ghost" use:ripple>Ghost</button>
	<button class="button button-cta" use:ripple>Call to action</button>
	<button class="button button-link" use:ripple>Link</button>
</div>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit cupiditate pariatur harum, possimus
sit mollitia vitae sunt ratione voluptatem qui!

<style>
</style>
