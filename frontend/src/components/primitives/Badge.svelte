<!-- 
    Component to add small notification indicators or other badges to parent.
    Useful to add warnings or notifications to buttons and tokens.
-->
<script lang="ts">
	import { colors } from '$utils/colors';
	import { elasticIn } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let color: string = colors.secondary[500];
</script>

<div style:--color={color} in:scale={{ easing: elasticIn }}>
	<slot />
</div>

<style>
	div {
		position: absolute;
		flex: none;
		top: 6px;
		right: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--color);
		box-shadow: 1px 3px 6px -2px var(--color);
	}
</style>
