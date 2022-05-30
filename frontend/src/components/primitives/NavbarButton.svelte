<script lang="ts">
	import { cssSize, type SizeInput } from '$utils/helpers/css';

	export let href: string = undefined;
	export let size: SizeInput = '1em';
	export let square: boolean = undefined;
	export let active: boolean = undefined;

	$: parsedSize = cssSize(size);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	class="nav-button"
	class:square
	class:active
	style:font-size={parsedSize}
>
	<slot />
</svelte:element>

<style>
	.nav-button {
	}
</style>
