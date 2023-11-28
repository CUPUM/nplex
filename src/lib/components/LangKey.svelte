<!--
	@component
	Until svelte 5 drops and runes allow for reactivity with paraglide's message funcitons.
 -->
<script lang="ts">
	import { page } from '$app/stores';
</script>

{#key $page.data.lang}
	<slot />
{/key}
