<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { HTMLOptionAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = HTMLOptionAttributes & {
		value: V;
	};

	export let value: $$Props['value'];
</script>

<option {value} {...$$restProps}>
	<slot />
</option>

<style lang="scss">
</style>
