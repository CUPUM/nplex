<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import { reveal } from '$actions/reveal';
	import { slipMask } from '$utils/presets/reveal';

	export let title: string;
	export let data;
</script>

<section>
	<h4 use:reveal={slipMask}>{title}</h4>
	<ul use:horizontalScroll={{}}>
		<slot />
		{#each data as datum}
			<slot name="list" {datum} />
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		width: 100%;
		display: grid;
		@include mixins.core-grid;
	}

	h4 {
		grid-column: main;
	}

	ul {
		position: relative;
		grid-column: full;
		display: flex;
		flex-direction: row;
		gap: 3rem;
		flex-wrap: nowrap;
		overflow-x: scroll;
		overflow-y: visible;
		padding: 0rem 6rem;
		padding-bottom: 2rem;
		--scroll-color: rgba(0, 0, 0, 0.05);
	}
</style>
