<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<menu class="toolbar" in:fly|global={{ y: 8, easing: expoOut, duration: 500, delay: 150 }}>
	<slot />
</menu>

<style lang="postcss">
	menu {
		--toolbar-inset: 0px;
		--toolbar-gap: 0.5em;
		width: 100%;
		font-size: var(--size-sm);
		justify-content: flex-end;
	}
</style>
