<script lang="ts" context="module">
</script>

<script lang="ts">
	import Range from '$components/Range.svelte';
	import RangeLine from '$components/RangeLine.svelte';
	import RangeThumb from '$components/RangeThumb.svelte';

	let a = 10;
	let b = 40;
	let c = 50;
</script>

<article>
	<Range min="0" max="100" step="5">
		<RangeLine bind:from={a} bind:to={b} bidirectional draggable />
		<RangeThumb name="a" bind:value={a} />
		<RangeThumb name="b" bind:value={b} />
		<RangeThumb name="c" bind:value={c} />
	</Range>
	<hr />
	<Range min="0" max="100" step="5" direction="column" style="height: 200px;">
		<RangeLine>
			<RangeThumb name="a" value={a} />
			<RangeThumb name="b" value={b} />
			<RangeThumb name="c" value={c} />
		</RangeLine>
	</Range>
</article>

<style lang="scss">
	article {
		padding: 4rem;
		width: 100%;
		height: 500px;
	}
</style>
