<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import type { ComponentProps } from 'svelte';

	type V = $$Generic;
	type $$Props = ComponentProps<Field<V>>;

	export let value: V;
</script>

<div class="map-search">
	<Field {value} {...$$restProps} variant="opaque" />
</div>

<style lang="scss">
	.map-search {
		width: 300px;
		opacity: 0.25;
		transform: scale(0.98);
		transition: all 0.25s var(--ui-ease-out);

		:global(figure:hover) & {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
