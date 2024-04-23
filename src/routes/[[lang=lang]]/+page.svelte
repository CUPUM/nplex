<script lang="ts">
	import { ripple } from '$lib/actions/ripple';

	export let data;

	let mounted = false;

	// onMount(() => {
	// 	mounted = true;
	// });
</script>

<button
	class="px-brick-gutter rounded-brick bg-input hover:bg-input-accent h-brick font-brick text-over-input relative inline-flex flex-row items-center self-start"
	use:ripple
>
	Hello ripple
</button>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit cupiditate pariatur harum, possimus
sit mollitia vitae sunt ratione voluptatem qui!

<style>
</style>
