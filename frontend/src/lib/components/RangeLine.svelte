<script lang="ts" context="module">
	import { getContext, setContext } from 'svelte';

	const CTX_KEY = 'range-line-context';

	interface RangeLineContext {
		test: string;
	}

	export function getRangeLineContext() {
		return getContext<RangeLineContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	setContext<RangeLineContext>(CTX_KEY, {
		test: '',
	});
</script>

<div class="line">Range Line: {''}</div>
<slot />

<style lang="scss">
	:where(.line) {
	}
</style>
