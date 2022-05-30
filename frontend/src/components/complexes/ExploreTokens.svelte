<script lang="ts">
	import Token from '$components/primitives/Token.svelte';
</script>

<form action="">
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
	<Token>Test</Token>
</form>

<style lang="postcss">
	form {
		position: relative;
		z-index: 10;
		grid-area: tokens;
		display: block;
		overflow-x: overlay;
		white-space: nowrap;
		margin-left: 0.5rem;
		margin-right: 1rem;
		border-radius: 1em;
		/* mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%); */
		transition: all 0.25s ease-out;

		&:hover {
			/* mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%); */
			/* mask-image: unset; */
		}
	}
</style>
