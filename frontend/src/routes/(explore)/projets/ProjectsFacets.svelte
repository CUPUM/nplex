<script lang="ts">
	function search(e: Event) {
		e.preventDefault();
	}
</script>

<form on:submit={search} />

<style lang="scss">
	form {
		--top: calc(var(--ui-nav-h) + var(--ui-search-h) + 1rem);
		position: relative;
		top: var(--top);
		max-height: calc(100vh - var(--top) - 1.5rem);
		left: 0;
		width: 100%;
		height: 1200px;
		border-radius: var(--ui-radius-lg);
		overflow-y: scroll;
		background: col(bg, 100);
	}
</style>
