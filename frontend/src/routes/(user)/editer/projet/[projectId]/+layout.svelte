<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import type { LayoutData } from './$types';
	import { formProject, STARTID } from './common';
	import Header from './Header.svelte';
	import Menu from './Menu.svelte';

	export let data: LayoutData;

	$: formProject.set({ ...data.project });
</script>

<!-- <RootTheme theme="dark" /> -->
<RootBackground body={col('bg', '500')} duration={750} />
<Header {data} />
<article id={STARTID}>
	<slot />
	<Menu />
</article>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
