<!--
	@component
	A small tip svg shape. Useful to show where popoevers, tooltips, or other elements are anchored.

	For styles, the component uses a single globally reachable class named `.ui-tip`.
-->
<script lang="ts" context="module">
	const TIP_ROUNDNESS = 20;

	const TIP =
		`M 0,-0 C ${TIP_ROUNDNESS},0 ` +
		`${50 - TIP_ROUNDNESS},50 50,50 C ${50 + TIP_ROUNDNESS},50 ` +
		`${100 - TIP_ROUNDNESS},0 100,-0 Z`;
</script>

<script lang="ts">
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
</script>

<svg class="ui-tip {className}" {style} viewBox="26 2 74 50" preserveAspectRatio="xMinYMin slice">
	<path d={TIP} />
</svg>

<style lang="scss">
	.ui-tip {
		pointer-events: none;
		position: absolute;
		height: 0.5em;
		width: 0.5em;
		padding: 0;
		margin: 0;
		background: transparent;
		overflow: visible;
		path {
			fill: currentColor;
		}
	}
</style>
