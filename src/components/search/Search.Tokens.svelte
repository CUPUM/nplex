<script lang="ts">
	let tokens = ['token 1', 'token 2', 'token 3', 'token 4'];
</script>

<fieldset id="tokens">
	<ul>
		{#each tokens as token}
			<li>
				<span>
					{token}
				</span>
				<button>X</button>
			</li>
		{/each}
	</ul>
</fieldset>

<style>
	fieldset {
		flex: 1 0;
		padding: 0;
		margin: 0;
		border: none;
	}

	ul {
		display: inline-flex;
		padding: 0;
		margin: 0;
		text-indent: 0;
	}

	li {
		--size: 2.5em;
		font-size: var(--size-small);
		display: inline-flex;
		height: var(--size);
		padding: 0;
		margin-block: 0;
		margin-right: 5px;
		background-color: var(--color-primary-300);
		color: var(--color-primary-900);
		border-radius: calc(var(--size) / 2);
		justify-content: center;
		align-items: center;
	}

	span {
		padding-inline: 1em;
	}

	li > button {
		font-size: var(--size-small);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: var(--size);
		width: var(--size);
		max-width: var(--size);
		max-height: var(--size);
		border: none;
		padding: 0;
		margin: 0;
		border-radius: 50%;
		background-color: var(--color-primary-100);
	}
</style>
