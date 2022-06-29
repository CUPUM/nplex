<script lang="ts">
	import type { SizeInput } from '$utils/css';

	export let href: string;
	export let text: string;
	export let size: SizeInput = '1em';
</script>

<a {href} {...$$restProps} style:text-size={size}>
	<span>{text}</span>
	<slot />
</a>

<style>
</style>
