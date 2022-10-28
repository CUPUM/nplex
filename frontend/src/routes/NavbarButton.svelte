<script lang="ts" context="module">
</script>

<script lang="ts">
	export let href: string | undefined = undefined;
</script>

<svelte:element this={href ? 'a' : 'button'}>
	<slot />
</svelte:element>

<style lang="scss">
</style>
