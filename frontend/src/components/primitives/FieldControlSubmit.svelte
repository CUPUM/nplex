<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext, onDestroy, onMount, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import type { FieldContext } from './Field.svelte';
	import Icon from './Icon.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';

	let canSubmit = false;

	const { reset, getInputRef, initialValue } = getContext<FieldContext>(Ctx.Field);

	function updateState(e) {
		canSubmit = e.target.value !== initialValue;
	}

	onMount(() => {
		getInputRef()?.addEventListener('input', updateState);
	});

	onDestroy(() => {
		getInputRef()?.removeEventListener('input', updateState);
	});
</script>

<Button {variant} square on:click={reset} disabled={!canSubmit}>
	<Icon name="arrow-right" size="1.5em" />
</Button>

<style lang="scss">
</style>
