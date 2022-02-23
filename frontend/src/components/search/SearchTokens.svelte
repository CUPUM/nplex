<script lang="ts">
	import SearchToken from './SearchToken.svelte';
	let tokens = ['token 1', 'token 2', 'token 3', 'token 4'];
</script>

<fieldset id="tokens">
	<ul>
		{#each tokens as token}
			<SearchToken>
				{token}
			</SearchToken>
		{/each}
	</ul>
</fieldset>

<style>
	ul {
		display: inline-flex;
		padding: 0;
		margin: 0;
		text-indent: 0;
	}
</style>
