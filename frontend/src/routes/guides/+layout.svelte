<script lang="ts">
</script>

<div>
	<!-- <aside>
		<ul>
			<li>
				<a href="">Article</a>
			</li>
		</ul>
	</aside> -->
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		width: 100%;
		min-height: 100vh;
		margin: 0;
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
		padding-top: var(--navbar-height);
	}
</style>
