<!--
	@component
	## Map File Control
	A custom Maplibre control to handle opening and displaying data from local file(s) uploaded by users.

 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { getMapContext } from './Map/Map.svelte';

	type $$Props = ComponentProps<Button>;

	$: typedProps = $$props as $$Props;

	const mapContext = getMapContext();
</script>

<Button as="label" equi={!$$slots.default || typedProps.equi} variant="ghost" {...typedProps}>
	<slot>
		<Icon name="upload" />
	</slot>
	<input hidden type="file" name="" />
</Button>

<style lang="scss">
</style>
