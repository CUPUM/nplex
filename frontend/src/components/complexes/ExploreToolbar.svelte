<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
</script>

<div>
	<Button>Test</Button>
	<Button>Test</Button>
	<Button icon="more" />
</div>

<style>
	div {
		grid-area: toolbar;
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 3px;
	}
</style>
