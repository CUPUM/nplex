<script lang="ts">
	import { Ctx } from '$utils/enums';
	import { getContext } from 'svelte';
	import Loading from './Loading.svelte';
	import Ripple from './Ripple.svelte';
	import type { SwitchContext } from './Switch.svelte';

	export let id: string | undefined = undefined;
	export let value: any;
	export let disabled: boolean = false;
	export let loading: boolean | undefined = undefined;

	const { name, variant, group, currentRef, tempRef, setCurrent, setTemp, clearTemp } = getContext<SwitchContext>(
		Ctx.Switch
	);

	let itemRef: HTMLLabelElement;

	$: if ($group === value && itemRef !== $currentRef) {
		setCurrent(itemRef, value);
	}

	function handle(e: InputEvent) {
		if ((e.target as any).checked) {
			setCurrent(itemRef, value);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	bind:this={itemRef}
	for={id}
	class:current={itemRef === $currentRef}
	class:some-temp={!!$tempRef}
	class={variant}
	class:disabled
	class:loading
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mouseenter={() => setTemp(itemRef)}
	on:mouseleave={() => clearTemp(itemRef)}
>
	<Ripple />
	<input {id} {value} {name} type="radio" on:input={handle} on:change on:input />
	<div class="inner">
		<div class="slot">
			<slot />
		</div>
		{#if variant === 'nav'}
			<div class="slot-current">
				<slot />
			</div>
		{/if}
	</div>
	{#if loading}
		<Loading />
	{/if}
</label>

<style lang="scss">
	label {
		// z-index: 1;
		user-select: none;
		position: relative;
		cursor: pointer;
		font-weight: 400;
		display: flex;
		padding: 0 1.2em;
		height: var(--ctx-computed-height);
		justify-content: center;
		align-items: center;
		border-radius: var(--ctx-computed-radius);
		transition: all 0.15s ease-out;

		&.disabled {
			pointer-events: none;
		}

		&.loading {
			pointer-events: none;

			& .inner {
				opacity: 0.2;
				transform: scale(0.94);
			}
		}
	}

	.inner {
		display: block;
		position: relative;
		top: -0.1em;
		transition: transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5), opacity 0.15s ease-in-out;
		padding: 0;
		margin: 0;
		transform-style: preserve-3d;
	}

	.slot {
		position: relative;
	}

	.slot-current {
		position: absolute;
		top: 0;
	}

	input {
		opacity: 0;
		position: absolute;
		width: 0;
		height: 0;
		max-width: 0;
		margin: 0;
		padding: 0;
	}

	//
	// Variants
	//

	.default {
		background-color: transparent;
		color: var(--color-dark-300);
		&:hover,
		&:focus {
			color: var(--color-dark-900);
		}
		&.current {
			color: var(--color-light-500);
			&.some-temp {
				color: var(--color-primary-700);
			}
		}
	}

	.nav {
		font-weight: 500;
		background-color: transparent;
		color: var(--color-dark-300);
		opacity: 1;
		perspective: 600px;
		& .slot {
			transform-origin: center 12em;
			opacity: 1;
			transform: rotateZ(0deg);
			transition: all 0.35s cubic-bezier(0.5, 0, 0, 1), color 0s;
		}
		& .slot-current {
			color: var(--color-light-500);
			transform-origin: center 12em;
			opacity: 0;
			transform: rotateZ(-30deg);
			transition: all 0.35s cubic-bezier(0.5, 0, 0, 1);
		}
		&:hover,
		&:focus {
			opacity: 1;
			color: var(--color-primary-500);
		}
		&.current {
			& .slot {
				opacity: 0;
				transform: rotateZ(30deg);
			}
			& .slot-current {
				opacity: 1;
				transform: rotateZ(0deg);
			}
			&.some-temp {
				& .slot-current {
					color: var(--color-primary-100);
				}
			}
		}
	}
</style>
