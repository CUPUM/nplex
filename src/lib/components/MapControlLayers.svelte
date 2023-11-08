<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Popover from '$components/Popover.svelte';
	import type { ComponentProps } from 'svelte';
	import { getMapContext } from './Map.svelte';

	export let align: ComponentProps<Popover>['align'] = 'center';
	export let place: ComponentProps<Popover>['place'] = 'bottom';

	const { getMap, getDraw } = getMapContext();
</script>

<Popover distance="2rem" {place} {align} let:opened>
	<Button slot="control" equi active={opened} variant="ghost"><Icon name="layers" /></Button>
	<slot />
</Popover>

<style lang="scss">
</style>
