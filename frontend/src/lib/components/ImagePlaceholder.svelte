<script lang="ts">
	export let variant: 'gradients' | 'blobs' = 'gradients';
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
</script>

<div {style} class="{variant} {className}" role="presentation" />

<style lang="scss">
	div {
	}
</style>
