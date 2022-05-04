<script lang="ts">
	import type { CssSizeValue } from '$utils/helpers/css';

	export let href: string;
	export let text: string;
	export let size: number | CssSizeValue = '1em';
</script>

<a {href} {...$$restProps} style:text-size={size}>
	<span>{text}</span>
	<slot />
</a>

<style>
</style>
