<script lang="ts">
	import { onMount } from 'svelte';

	export let name: string;
	export let hoverName: string = null;
	export let hover: boolean = false;

	type SvgData = { string: string; width?: string; height?: string };
	let svg: SvgData = null;
	let hoverSvg: SvgData = null;

	async function getSvg(iconName: string): Promise<SvgData> {
		const svg = await fetch(`/icons/${iconName}.svg`, {
			cache: 'force-cache'
		});
		const string = await svg.text();
		const width = string.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1];
		const height = string.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1];
		return { string, width, height };
	}

	onMount(async () => {
		svg = await getSvg(name);
		if (hoverName) {
			hoverSvg = await getSvg(hoverName);
		}
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{...$$props}
	aria-label="{name} icon"
	height={svg?.width}
	width={svg?.height}
>
	{@html svg?.string}
</svg>

<style>
	svg {
		overflow: visible;
	}
</style>
