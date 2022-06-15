<!-- 
    Component to add small notification indicators or other badges to parent.
    Useful to add warnings or notifications to buttons and tokens.
-->
<script lang="ts">
	import { colors } from '$utils/colors';
	import { cssSize, type SizeInput } from '$utils/helpers/css';
	import { elasticOut, expoIn } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let color: string = colors.primary[500];
	export let size: SizeInput = '6px';
</script>

<div
	style:font-size={cssSize(size)}
	style:--color={color}
	in:scale={{ easing: elasticOut, duration: 750 }}
	out:scale={{ easing: expoIn, duration: 1000 }}
>
	<slot />
</div>

<style>
	div {
		position: absolute;
		flex: none;
		top: 8px;
		right: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2em;
		height: 2em;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--color);
		transform: translate(50%, -50%);
	}
</style>
