<!--
	@component
	## Logo
	Reusable and stylable logotype component.
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let id: string | undefined = undefined;
	export let short: boolean = false;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let width = tweened(0, { duration: 0, easing: cubicInOut });
	$: width.set(short ? 190 : 1000);
</script>

<i class={className} {style} {id} class:short on:keypress on:click on:focus on:blur>
	<svg
		viewBox="0 20 {$width} 340"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
	>
		<!-- prettier-ignore -->
		<path class="path n" style="--i: 0" vector-effect="non-scaling-stroke" d="M0.0947266 190.823C0.0947266 138.412 42.5828 95.9236 94.9946 95.9236C147.406 95.9236 189.894 138.412 189.894 190.823V301.118H132.846V150.504H57.1433V301.118H0.0947266V190.823Z" fill="black"/>
		<!-- prettier-ignore -->
		<path class="path p" style="--i: 1" vector-effect="non-scaling-stroke" fill-rule="evenodd" clip-rule="evenodd" d="M306.224 296.57C317.877 302.397 330.918 305.31 345.347 305.31C363.937 305.31 380.586 300.732 395.292 291.575C409.997 282.419 421.512 269.933 429.837 254.117C438.438 238.301 442.739 220.543 442.739 200.843C442.739 180.865 438.438 162.968 429.837 147.152C421.512 131.336 409.997 118.85 395.292 109.694C380.586 100.537 363.937 95.9587 345.347 95.9587C330.918 95.9587 317.877 99.0109 306.224 105.115C299.518 108.713 293.536 113.082 288.277 118.223L288.327 100.121H233.804V385.221H287.911V283.448C293.178 288.56 299.283 292.934 306.224 296.57ZM335.774 254.949C345.763 254.949 354.642 252.73 362.411 248.29C370.18 243.573 376.146 237.191 380.308 229.145C384.748 220.821 386.967 211.248 386.967 200.426C386.967 189.883 384.748 180.587 380.308 172.541C376.146 164.217 370.18 157.835 362.411 153.395C354.642 148.678 345.763 146.32 335.774 146.32C326.063 146.32 317.322 148.678 309.553 153.395C301.784 157.835 295.68 164.217 291.24 172.541C287.078 180.587 284.997 189.883 284.997 200.426C284.997 211.248 287.078 220.821 291.24 229.145C295.68 237.191 301.645 243.573 309.137 248.29C316.906 252.73 325.785 254.949 335.774 254.949Z" fill="black"/>
		<!-- prettier-ignore -->
		<path class="path l" style="--i: 2" vector-effect="non-scaling-stroke" d="M478.487 0.231445V301.148H533.01V0.231445H478.487Z" fill="black"/>
		<!-- prettier-ignore -->
		<path class="path e" style="--i: 3" vector-effect="non-scaling-stroke" fill-rule="evenodd" clip-rule="evenodd" d="M677.463 305.31C656.375 305.31 637.646 300.87 621.275 291.991C604.904 282.835 591.863 270.349 582.152 254.533C572.718 238.717 568.001 220.682 568.001 200.426C568.001 180.448 572.579 162.69 581.735 147.152C591.169 131.336 603.933 118.85 620.026 109.693C636.12 100.259 654.016 95.5425 673.717 95.5425C693.14 95.5425 710.204 99.982 724.91 108.861C739.894 117.463 751.547 129.394 759.871 144.655C768.473 159.638 772.774 176.703 772.774 195.848C772.774 199.455 772.496 203.201 771.941 207.086C771.664 210.693 770.97 214.855 769.86 219.572L622.852 219.966C623.916 224.101 625.333 227.992 627.102 231.642C631.819 240.521 638.478 247.457 647.08 252.452C655.681 257.169 665.67 259.527 677.047 259.527C687.313 259.527 696.608 257.863 704.932 254.533C713.256 250.926 720.471 245.654 726.575 238.717L758.623 270.765C748.911 282.141 736.98 290.743 722.829 296.57C708.956 302.397 693.833 305.31 677.463 305.31ZM720.208 178.861L622.881 179.174C623.857 175.48 625.125 172.02 626.686 168.794C631.125 159.915 637.368 153.117 645.415 148.4C653.462 143.406 662.896 140.909 673.717 140.909C683.983 140.909 692.585 143.129 699.522 147.568C706.736 151.73 712.147 157.834 715.754 165.881C717.625 169.757 719.11 174.084 720.208 178.861Z" fill="black"/>
		<!-- prettier-ignore -->
		<path class="path x" style="--i: 4" vector-effect="non-scaling-stroke" d="M931.399 200.62L1000.09 131.925L964.075 95.9048L895.379 164.6L826.684 95.9048L790.664 131.925L859.359 200.62L790.664 269.315L826.684 305.335L895.379 236.64L964.075 305.335L1000.09 269.315L931.399 200.62Z" fill="black"/>
	</svg>
</i>

<style lang="scss">
	i {
		display: block;
		margin: 0;
	}

	svg {
		padding: 0;
		margin: 0;
		height: 1em;
		overflow: visible;
		outline: none;
	}

	.path {
		fill: currentColor;
		transition: opacity 0.35s calc(var(--i) * 0.1s) cubic-bezier(0, 0, 0, 1),
			transform 0.35s calc(var(--i) * 0.1s) cubic-bezier(0, 0, 0, 1);
	}

	.short {
		.path {
			transition: opacity 0.15s calc((4 - var(--i)) * 0.05s) cubic-bezier(0.5, 0, 0.5, 0.5),
				transform 0.15s calc((4 - var(--i)) * 0.05s) cubic-bezier(0.5, 0, 0.5, 0.5);
		}
		.p,
		.l,
		.e,
		.x {
			opacity: 0;
			transform: scale(0.9) translateX(-10px);
		}
	}
</style>
