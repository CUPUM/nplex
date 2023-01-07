<script lang="ts">
</script>

<ul>
	<li>Mes notifications</li>
	<li>Mes projets</li>
	<li>Mes organisations</li>
	<li>Mes acteurs</li>
	<li>Mes favoris</li>
	<li>Mes collections</li>
</ul>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding: var(--ui-gutter);
		padding-top: 0;
		gap: var(--ui-gutter);
		border-radius: var(--ui-radius-lg);
		border: 1px solid col(fg, 100, 0.1);
	}

	.sub {
		font-weight: 300;
		opacity: 0.5;
	}

	h2 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		padding: var(--ui-gutter) 0;
	}
</style>
