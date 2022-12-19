<script lang="ts">
</script>

<div>
	<header>
		<span class="heading-label">Plus récente nouvelle</span>
		<h2>Titre de la nouvelle</h2>
	</header>
	<section>
		<aside>
			<ul>
				<li>nouvelle 1</li>
				<li>nouvelle 2</li>
				<li>nouvelle 3</li>
				<li>nouvelle 4</li>
			</ul>
		</aside>
		<slot />
	</section>
</div>

<style lang="scss">
	div {
		margin-top: var(--navbar-height);
	}

	.heading-label,
	h2 {
		font-size: var(--ui-block-x2large);
		font-weight: 500;
		padding: 0;
		margin: 0;
	}

	.heading-label {
		font-weight: 400;
		color: var(--color-primary-500);
	}
</style>
