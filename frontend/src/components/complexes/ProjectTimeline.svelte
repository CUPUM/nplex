<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
</script>

<section use:horizontalScroll>
	<h3>test</h3>
</section>

<style lang="postcss">
	section {
		grid-area: full;
		width: 100%;
		background-color: grey;
		height: 50vh;
		overflow: overlay;
	}
</style>
