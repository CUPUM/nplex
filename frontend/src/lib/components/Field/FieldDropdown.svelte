<script lang="ts">
	import Popover from '$components/Popover.svelte';
</script>

<Popover>
	<slot name="field" slot="control" />
	<ul class="field-dropdown" slot="content">
		<slot />
	</ul>
</Popover>

<style lang="scss">
	.field-dropdown {
		width: var(--tether-w);
		background-color: red;
		border-radius: var(--ui-radius-md);
	}
</style>
