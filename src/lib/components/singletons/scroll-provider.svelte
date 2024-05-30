<script context="module" lang="ts">
	export const scroll = $state({ y: 0, x: 0 });
</script>

<svelte:window
	onscroll={(e) => {
		scroll.y = document.documentElement.scrollTop;
		scroll.x = document.documentElement.scrollLeft;
		document.documentElement.style.setProperty('--scroll-y', `${scroll.y}px`);
		document.documentElement.style.setProperty('--scroll-x', `${scroll.x}px`);
	}}
/>
