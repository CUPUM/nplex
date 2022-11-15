<!--
	@component
	Basic wrapper component to facilitate adding an arrow indicator on dropdown triggers (such as buttons).
	The parent components setting the active/inactive state should declare it as a slot prop for easy inline value-passing.
	
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from './Icon.svelte';

	type $$RestProps = Omit<ComponentProps<Icon>, 'name'>;
	$: typedProps = $$restProps as $$RestProps;

	export let active: boolean;
	export let iconInactive: ComponentProps<Icon>['name'] = 'chevron-down';
	export let iconActive: ComponentProps<Icon>['name'] = 'chevron-up';
</script>

<Icon name={active ? iconActive : iconInactive} {...typedProps} />
