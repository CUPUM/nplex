<script lang="ts">
	export let projectId: string = undefined;
</script>

<div>
	<h3>Projet</h3>
</div>

<style lang="postcss">
	div {
		cursor: pointer;
		flex: 0 0 200px;
		display: grid;
		width: 100%;
		border-radius: 1.5rem;
		/* background-color: var(--color-light-700); */
		border: 1px solid var(--color-light-700);
		transition: all 0.15s ease-out;

		&:hover {
			background-color: var(--color-light-100);
			box-shadow: 0 1rem 4rem -3.5rem var(--color-primary-900);
		}
	}
</style>
