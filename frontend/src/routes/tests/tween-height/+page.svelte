<script lang="ts">
	import { tweenHeight } from '$actions/tweenHeight';
	import Button from '$components/Button/Button.svelte';

	let arr = [1, 2, 3];
</script>

<article>
	Hello, this is to test height tweening.
	<ul use:tweenHeight>
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
	}

	li {
		padding: 1rem;
		background: wheat;
	}
</style>
