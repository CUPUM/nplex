<script lang="ts">
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { THEMES } from '$utils/themes';
	import type { PageData } from './$types';

	export let data: PageData;

	let background = 'aliceblue';
</script>

<hr />

<div style:background>Top</div>
<article>
	<!-- some content -->
</article>
<article>
	<!-- some content -->
</article>
<article use:overlapNavbarStyle={{ theme: THEMES.dark }} style="background: cornsilk" />
<article use:overlapNavbarStyle={{ theme: THEMES.dark }} style="height: 200px; background: wheat;">
	<!-- some content -->
</article>
<article>
	<!-- some content -->
</article>
<article>
	<!-- some content -->
</article>
<article>
	<!-- some content -->
</article>
<article>
	<!-- some content -->
</article>

<style lang="scss">
	hr {
		background: red;
		position: sticky;
		top: 120px;
		padding: 0.5px;
		width: 100%;
		z-index: 10;
	}

	article {
		border: 1px solid black;
		width: 100%;
		height: 1200px;
	}

	div {
		position: sticky;
		top: var(--ui-nav-px);
		padding: 1rem;
		transition: 0.2s;
		width: 100%;
		border: 1px solid grey;
	}
</style>
