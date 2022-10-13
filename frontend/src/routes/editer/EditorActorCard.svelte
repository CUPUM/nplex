<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
</script>

<li class="create">
	<Button href="/editer/projet">
		Créer un nouveau profil d'acteur de projet
		<svelte:fragment slot="trailing">
			<Icon name="pen-plus" />
		</svelte:fragment>
	</Button>
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
