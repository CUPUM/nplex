<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext, onDestroy, onMount, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import type { FieldContext } from './Field.svelte';
	import Icon from './Icon.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';

	let canReset = false;

	const { reset, getInputRef, initialValue } = getContext<FieldContext>(Ctx.Field);

	function updateCanReset(e) {
		canReset = e.target.value !== initialValue;
	}

	onMount(() => {
		getInputRef().addEventListener('input', updateCanReset);
	});

	onDestroy(() => {
		getInputRef().removeEventListener('input', updateCanReset);
	});
</script>

<Button {variant} square on:click={reset} disabled={!canReset}>
	<Icon name="cross" size="1.5em" />
</Button>

<style lang="scss">
</style>
