<script lang="ts">
	import { draw, fade } from 'svelte/transition';

	export let name: string;
	// export let strokeWidth = 2;
	let triggered = false;
	function trigger() {
		triggered = !triggered;
	}
</script>


<div on:click={trigger}>
	{#if triggered}
		<svg in:fade>
			<use href="/icons/{name}.svg#{name}"></use>
		</svg>
	{/if}
</div>


<style>
	div {
		background-color: grey;
		cursor: pointer;
		height: 50px;
	}

	svg {
		fill: red;
	}
</style>