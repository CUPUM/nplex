<script lang="ts" generics="T extends number[]">
	import { createSlider, melt } from '@melt-ui/svelte';

	// export let defaultValue: FixedLengthArray<number, T['length']>;
	export let value: T | undefined = undefined;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;

	const {
		elements: { root, range, thumb },
		options: { step: _step, min: _min, max: _max },
		states: { value: _value },
	} = createSlider({
		min,
		max,
		step,
		onValueChange: ({ curr, next }) => {
			value = next as T;
			return next;
		},
		defaultValue: value,
	});

	$: if (value && value != $_value) {
		if (value?.some((v, i) => v !== $_value[i])) {
			_value.set(value);
		}
	}
	$: _step.set(step);
	$: _min.set(min);
	$: _max.set(max);
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

<style>
	.slider {
		--slider-block-size: var(--base-block-size);
		--slider-thumb-size: calc(var(--base-block-size) / 2.5);
		--slider-track-thickness: 5px;
		--_slider-padding: calc(var(--slider-thumb-size) / 2);
		padding: 0 var(--_slider-padding);
		position: relative;
		width: 100%;
	}

	.slider-root {
		position: relative;
		display: flex;
		height: var(--slider-block-size);
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
		transition:
			all var(--duration-fast) ease-out,
			left 0s,
			right 0s,
			top 0s,
			width 0s,
			height 0s;
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

		&:focus {
			outline: var(--base-focus-ring);
		}
	}
</style>
