<script lang="ts" context="module">
</script>

<script lang="ts">
	import Range from '$components/Range.svelte';
	import RangeGroup from '$components/RangeGroup.svelte';
	import RangeThumb from '$components/RangeThumb.svelte';
	import RangeTicks from '$components/RangeTicks.svelte';

	let a = 10;
	let b = 40;
	let c = 50;
</script>

<article>
	<Range min={0} max={100} step={10}>
		<RangeTicks ticks={[50, 70, 80, 100]} let:value>
			{value} Yeeaw tesasd asd asdas d ts
		</RangeTicks>
		<RangeGroup bind:from={a} bind:to={b} draggable />
		<RangeThumb name="a" bind:value={a} />
		<RangeThumb name="b" bind:value={b} />
	</Range>
</article>
<article>
	<Range min={0} max={100} step={5} direction="row" style="height: 200px;">
		<RangeGroup draggable>
			<RangeThumb name="a" value={a} />
			<RangeThumb name="b" value={b} />
		</RangeGroup>
	</Range>
</article>
<article>
	<Range min={0} max={100} step={5} direction="column" style="height: 200px;">
		<RangeTicks ticks={[50, 70, 80, 100]} />
		<RangeGroup bind:from={a} bind:to={b} draggable />
		<RangeThumb name="a" bind:value={a} />
		<RangeThumb name="b" bind:value={b} />
	</Range>
</article>

<style lang="scss">
	article {
		padding: 2rem;
		width: 100%;
	}

	datalist {
		position: relative;
		display: block;
	}

	option {
		font-size: 20px;
		position: absolute;
		display: block;
		left: 50%;
	}
</style>
