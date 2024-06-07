<!--
	@component
	Provides current root scroll position in two forms:
	- A reactive readable state
	- CSS variables
-->
<script context="module" lang="ts">
	let x = $state(0);
	let y = $state(0);

	export const scroll = {
		get x() {
			return x;
		},
		get y() {
			return y;
		},
	};
</script>

<svelte:window
	onscroll={(e) => {
		x = document.documentElement.scrollLeft;
		y = document.documentElement.scrollTop;
		document.documentElement.style.setProperty('--scroll-x', `${x}px`);
		document.documentElement.style.setProperty('--scroll-y', `${y}px`);
	}}
/>
