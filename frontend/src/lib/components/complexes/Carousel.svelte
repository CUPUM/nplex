<script lang="ts">
	/**
	 * Array of item-descripting object or value.
	 */
	export let items: any[];
	/**
	 * Index of the current item.
	 */
	export let current: number = 0;
	/**
	 * Should the navigation behavior automatically loop around when first or last item is reached?
	 */
	export let loop: boolean = true;

	function next() {
		current = current === items.length - 1 ? 0 : current++;
	}

	function previous() {
		current = current === 0 ? items.length - 1 : current--;
	}
</script>

<section>
	<button class="previous">&leftarrow;</button>
	<ul>
		{#each items as item}
			<li>
				<slot {item} />
			</li>
		{/each}
	</ul>
	<button class="next">&rightarrow;</button>
	<div class="pagination">
		{current}
	</div>
</section>

<style>
	section {
	}

	ul {
	}

	li {
	}

	button {
		width: 2em;
		height: 2em;
	}
</style>
