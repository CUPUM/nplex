<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
</script>

<div>
	<Button>Test</Button>
	<Button>Test</Button>
	<Button>
		<Icon name="more" slot="icon" />
	</Button>
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
