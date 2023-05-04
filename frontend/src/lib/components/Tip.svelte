<!--
	@component
	A small tip svg shape. Useful to show where popoevers, tooltips, or other elements are anchored.

	For styles, the component uses a single globally reachable class named `.ui-tip`.
-->
<script lang="ts">
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	export let roundness = 20;

	$: d =
		`M 0,-0 C ${roundness},0 ` +
		`${50 - roundness},50 50,50 C ${50 + roundness},50 ` +
		`${100 - roundness},0 100,-0 Z`;
</script>

<svg class="tip {className}" {style} viewBox="25 0 75 50" preserveAspectRatio="xMinYMin slice">
	<path {d} />
</svg>

<style lang="scss">
	.tip {
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
