<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';

	let loading = true;
</script>

<section>
	<button
		on:pointerdown={() => {
			loading = !loading;
		}}
	>
		Show loading? ({loading})
	</button>
	{#if loading}
		<div>
			<Loading />
		</div>
	{/if}
</section>

<style lang="scss">
	button {
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.2);
	}
	div {
		width: 100px;
		height: 100px;
		position: relative;
	}
</style>
