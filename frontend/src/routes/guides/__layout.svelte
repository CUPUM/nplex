<script lang="ts" context="module">
</script>

<script lang="ts">
</script>

<div>
	<aside>
		<ul>
			<li>
				<a href="">Article</a>
			</li>
		</ul>
	</aside>
	<article>
		<slot />
	</article>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		margin-top: calc(-1 * var(--navbar-height));
	}

	aside {
		height: 100%;
		position: sticky;
		top: 0;
		padding-top: var(--navbar-height);
		margin: 0;
	}

	article {
		flex: 1;
	}
</style>
