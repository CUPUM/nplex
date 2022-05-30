<script lang="ts">
	import type { CSSSizeValue } from '$utils/helpers/css';

	export let href: string;
	export let text: string;
	export let size: number | CSSSizeValue = '1em';
</script>

<a {href} {...$$restProps} style:text-size={size}>
	<span>{text}</span>
	<slot />
</a>

<style>
</style>
