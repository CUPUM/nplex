<script lang="ts" context="module">
</script>

<script lang="ts">
	import GuidesAside from '$components/complexes/GuidesAside.svelte';
</script>

<div class="guides">
	<GuidesAside />
	<article class="core-grid">
		<slot />
	</article>
</div>

<style lang="scss">
	.guides {
		display: flex;
		flex-direction: row;
	}

	article {
		flex: 1;
	}
</style>
