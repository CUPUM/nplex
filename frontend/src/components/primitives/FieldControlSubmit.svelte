<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';
	import type { FieldContext } from './Field.svelte';
	import Icon from './Icon.svelte';

	export let variant: ComponentProps<Button>['variant'] = 'ghost';

	let canSubmit = false;

	const { reset } = getContext<FieldContext>(Ctx.Field);
</script>

<Button {variant} square on:click={reset} disabled={!canSubmit}>
	<Icon name="arrow-right" size="1.5em" />
</Button>

<style lang="scss">
</style>
