<script lang="ts">
	import { createSlider, melt, type CreateSliderProps } from '@melt-ui/svelte';

	export let value: CreateSliderProps['value'] = undefined;
	export let min: CreateSliderProps['max'] = 0;
	export let max: CreateSliderProps['max'] = 100;
	export let step: CreateSliderProps['step'] = 1;
	export let defaultValue: CreateSliderProps['defaultValue'] = [];

	const {
		elements: { root, range, thumb },
		states: { value: _value },
	} = createSlider({
		min,
		max,
		step,
		defaultValue,
		value,
	});
</script>

<span class="slider">
	<span class="slider-root" use:melt={$root}>
		<div class="slider-range-wrap">
			<span class="slider-range" use:melt={$range} />
		</div>
		{#each $_value as _v}
			<span class="slider-thumb" use:melt={$thumb()}>
				<slot name="thumb" value={_v} />
			</span>
		{/each}
	</span>
</span>

<style lang="postcss">
	.slider {
		--slider-size: var(--base-size);
		--slider-thumb-size: calc(var(--base-size) / 2.5);
		--slider-track-thickness: 5px;
		--_slider-padding: calc(var(--slider-thumb-size) / 2);
		padding: 0 var(--_slider-padding);
		position: relative;
		width: 100%;
	}

	.slider-root {
		position: relative;
		display: flex;
		height: var(--slider-size);
		align-items: center;
	}

	.slider-range-wrap {
		position: relative;
		width: 100%;
		border-radius: var(--radius-full);
		height: var(--slider-track-thickness);
		background-color: color-mix(in srgb, var(--color-neutral-500) 35%, transparent);
		:global(:--dark) & {
		}
	}

	.slider-range {
		height: 100%;
		border-radius: inherit;
		background-color: var(--color-neutral-600);
		:global(:--dark) & {
			background-color: var(--color-neutral-400);
		}
	}

	.slider-thumb {
		cursor: pointer;
		height: var(--slider-thumb-size);
		aspect-ratio: 1;
		border-radius: 50%;
		transition:
			all var(--duration-fast) ease-out,
			left 0s,
			top 0s,
			width 0s,
			height 0s;
		background-color: var(--color-neutral-700);
		:global(:--dark) & {
			background-color: var(--color-neutral-300);
		}
	}
</style>
