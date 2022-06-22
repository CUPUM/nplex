<script lang="ts">
</script>

<header>
	<hgroup>
		<h2>Project title here</h2>
		<hr />
		<div>
			<p>Project type here</p>
			<p>Project subtype here</p>
		</div>
	</hgroup>
</header>

<style lang="scss">
	header {
		display: grid;
		grid-template-columns: inherit;
		grid-column: full;
		background-color: var(--color-light-300);
		padding: 4rem;
		margin: 0;
	}

	hgroup {
		position: relative;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		display: grid;
		grid-column: main;
		padding: 0;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		color: var(--color-dark-900);
	}

	hr {
		left: 50%;
		width: 2px;
		border: none;
		height: 100%;
		background-color: var(--color-light-100);
		position: absolute;
	}

	h2 {
		margin: 0;
		padding: 0;
		font-size: var(--size-x3large);
		line-height: 1em;
	}

	p {
		font-size: var(--size-x2large);
		line-height: 1.5em;
		padding: 0;
		margin: 0;
	}
</style>
