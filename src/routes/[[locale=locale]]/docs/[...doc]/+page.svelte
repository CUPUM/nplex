<script lang="ts">
	export let data;
</script>

<div class="bg">{data.metadata.title}</div>
<h1>{data.metadata.title}</h1>
<svelte:component this={data.doc} />

<style lang="postcss">
	.bg {
		color: black;
		font-weight: 700;
		position: fixed;
		z-index: -1;
		font-size: 75vh;
		top: 50vh;
		transform: translate(-50%, -50%);
		left: 50vw;
		opacity: 0.1;
		filter: blur(12px);
	}
</style>
