<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import WatchScrollSize from '$components/WatchScrollSize.svelte';

	let arr = [1, 2, 3];

	let scrollHeight = 0;
</script>

<article>
	{scrollHeight}
	<ul>
		<WatchScrollSize bind:scrollHeight />
		{#each arr as n}
			<li>{n}</li>
		{/each}
	</ul>
	<Button
		on:click={() => {
			arr = [...arr, Math.round(Math.random() * 10)];
		}}
	>
		Add
	</Button>
</article>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 250px;
	}

	li {
		padding: 1rem;
		background: wheat;
	}
</style>
