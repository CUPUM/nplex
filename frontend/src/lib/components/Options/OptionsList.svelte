<script lang="ts" context="module">
	import { getContext, setContext } from 'svelte';

	const CTX_KEY = 'options-list-context';

	interface OptionsListContext {}

	function setOptionsListContext(context: OptionsListContext) {
		setContext<OptionsListContext>(CTX_KEY, context);
	}

	export function getOptionsListContext() {
		return getContext<OptionsListContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	export let id: string | undefined = undefined;

	setOptionsListContext({});
</script>

<datalist {id}>
	<slot />
</datalist>

<style lang="scss">
</style>
