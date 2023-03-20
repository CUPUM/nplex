<script lang="ts">
	import type { HTMLOptgroupAttributes } from 'svelte/elements';

	type $$Props = HTMLOptgroupAttributes;
</script>

<optgroup {...$$restProps}>
	<slot />
</optgroup>

<style lang="scss">
</style>
