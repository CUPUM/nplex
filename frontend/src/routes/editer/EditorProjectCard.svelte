<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon/Icon.svelte';

	export let datum = undefined;

	function createProject() {}
</script>

<li class:create={!datum} class:button-parent={!datum}>
	{#if datum}
		<a href="">
			{JSON.stringify(datum)}
		</a>
	{:else}
		<Button href="/editer/projet">
			Créer un nouveau projet
			<svelte:fragment slot="trailing">
				<Icon name="pen-plus" />
			</svelte:fragment>
		</Button>
	{/if}
</li>

<style lang="scss">
	li {
		flex: 0;
		position: relative;
		border-radius: 1.5rem;
		padding: 2rem;
		background-color: white;
		box-shadow: 0 1rem 3rem -2rem rgba(var(--rgb-dark-900), 0.25);
		aspect-ratio: 2 / 3;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 300px;
		max-width: min(600px, 50%);
	}

	a {
		width: 100%;
		height: 100%;
	}

	.create {
		background-color: transparent;
		border: 1.5px dashed rgba(var(--rgb-dark-500), 0.25);
		box-shadow: none;
	}
</style>
