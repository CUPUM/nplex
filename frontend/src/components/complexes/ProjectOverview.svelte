<script lang="ts">
</script>

<section>
	<!-- Left -->
	<div class="left">
		<p>Propriétaire</p>
		<p>Particulier</p>
	</div>
	<div class="left">
		<p>Propriétaire</p>
		<p>Particulier</p>
	</div>
	<div class="left">
		<p>Propriétaire</p>
		<p>Particulier</p>
	</div>
	<div class="left">
		<p>Propriétaire</p>
		<p>Particulier</p>
	</div>
	<!-- Right -->
	<div class="right">test 6 d</div>
	<div class="right">test 7 d</div>
	<div class="right">test 8 d</div>
</section>

<style lang="postcss">
	section {
		grid-column: main;
		width: 100%;
		padding: 2rem;
		margin: 0;
		display: grid;
		grid-template-columns:
			[left-start]
			1fr
			[left-end right-start]
			1fr
			[right-end];
		gap: 2rem;
		grid-auto-flow: dense;
	}

	.left {
		grid-column: left;
	}

	.right {
		grid-column: right;
	}
</style>
