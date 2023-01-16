<script lang="ts">
	import Counter from '$components/Counter.svelte';
	import Icon from '$components/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let value = 10;
</script>

<article>
	<input type="range" name="" bind:value min="0" max="200" id="" />
	<Counter {value} />
</article>
<article>
	<button>
		Some text
		<Icon name="settings" />
	</button>
	<button>
		Some text
		<Icon name="settings" />
	</button>
</article>

<style lang="scss">
	article {
		width: 100%;
		padding: 3rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		border: 1px solid blue;
	}

	button {
		display: inline-flex;
		align-items: center;
		border: 1px solid col(fg, 100, 0.2);
		border-radius: 1em;
		padding: 1em;
	}

	label {
		padding: 1em;
		background: col(bg, 500);
		margin: 3px;
		border-radius: 1em;
	}

	section {
		width: 100%;
		height: 500px;
		background: linear-gradient(121.28deg, #a4006c 0%, #ffeca8 100%),
			linear-gradient(121.28deg, #69003f 0%, #fff8f8 100%),
			linear-gradient(238.72deg, #00ffff 0%, #0212a4 100%),
			radial-gradient(67.16% 100% at 50% 0%, #ff00b8 0%, #ffffff 100%),
			linear-gradient(140.54deg, #7000ff 0%, #001aff 72.37%),
			linear-gradient(307.43deg, #ffe927 0%, #00114d 100%),
			radial-gradient(107% 142.8% at 15.71% 104.5%, #ffffff 0%, #a7aa00 100%), #ffffff;
		background-blend-mode: overlay, difference, difference, overlay, difference, difference,
			difference, normal;
	}
</style>
