<script lang="ts">
	import Token from '$components/primitives/Token.svelte';

	let tokens = ['token 1', 'token 2', 'token 3', 'token 4'];
</script>

<fieldset id="tokens">
	<ul>
		{#each tokens as token}
			<Token size="small">
				{token}
			</Token>
		{/each}
	</ul>
</fieldset>

<style>
	fieldset {
		flex: 1;
		border: none;
	}

	ul {
		display: flex;
		gap: 5px;
		padding: 0;
		margin: 0;
		text-indent: 0;
	}
</style>
