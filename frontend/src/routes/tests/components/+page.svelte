<script lang="ts">
	import Range from '$components/Range/Range.svelte';
	import RangeGroup from '$components/Range/RangeGroup.svelte';
	import RangeThumb from '$components/Range/RangeThumb.svelte';

	let thumb1 = 50;
	let thumb2 = 70;
</script>

<article>
	<code>Thumb 1: {thumb1}</code>
	<Range>
		<RangeGroup
			line
			draggable
			pushpull
			bind:from={thumb1}
			bind:to={thumb2}
			maxdelta={50}
			mindelta={20}
		/>
		<RangeThumb bind:value={thumb1} />
		<RangeThumb bind:value={thumb2} />
	</Range>
</article>

<style lang="scss">
	article {
		width: 100%;
		padding: 5rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	h2 {
		width: 100%;
	}

	.ui-skeleton {
		width: 500px;
		height: 2rem;
	}
</style>
