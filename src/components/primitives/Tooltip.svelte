<script lang="ts">
	import type { TooltipOptions } from 'src/types/tooltip';
	import { fade } from 'svelte/transition';

	export let message: TooltipOptions['message'];
</script>


<div in:fade={{duration: 500}} out:fade={{duration: 500}}>
	{message}
</div>


<style>
	div {
		background-color: red;
	}
</style>

