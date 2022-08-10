<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { Ctx } from '$utils/keys';
	import { getContext } from 'svelte';
	import type { SwitchContext } from './Switch.svelte';

	export let id: string;
	export let value: any;
	export let disabled: boolean = false;

	const { name, variant, group, currentRef, tempRef, setCurrent, setTemp, clearTemp } = getContext<SwitchContext>(
		Ctx.Switch
	);

	let itemRef: HTMLLabelElement;

	$: if ($group === value && itemRef !== $currentRef) {
		setCurrent(itemRef, value);
	}

	function handle(e) {
		if (e.target.checked) {
			setCurrent(itemRef, value);
		}
	}
</script>

<label
	bind:this={itemRef}
	for={id}
	class:current={itemRef === $currentRef}
	class:some-temp={!!$tempRef}
	class={variant}
	class:disabled
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mouseenter={() => setTemp(itemRef)}
	on:mouseleave={() => clearTemp(itemRef)}
	use:ripple={{}}
>
	<input {id} {value} {name} type="radio" on:input={handle} on:change on:input />
	<div class="inner">
		<div class="slot">
			<slot />
		</div>
		{#if variant === 'navbar'}
			<div class="slot-fx">
				<slot />
			</div>
		{/if}
	</div>
</label>

<style lang="scss">
	label {
		z-index: 1;
		user-select: none;
		position: relative;
		cursor: pointer;
		font-weight: 400;
		display: inline-flex;
		padding: 0 1.2em;
		height: calc(var(--size) - 2 * var(--inset));
		justify-content: center;
		align-items: center;
		border-radius: calc(var(--radius) - var(--inset));
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

	.slot-fx {
		position: absolute;
		left: 0;
		top: 0;
	}

	input {
		opacity: 0;
		position: absolute;
		width: 0;
		height: 0;
		max-width: 0;
	}

	/* Variants (should reflect options in Switch component) */

	/* Default theme */
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

	/* Nav theme */
	.navbar {
		font-weight: 600;
		background-color: transparent;
		color: var(--color-dark-900);
		opacity: 1;
		perspective: 600px;
		& .slot {
			opacity: 1;
			transform: translateY(0) rotateX(0deg) scale(1);
			transition: all 0.5s cubic-bezier(0.2, 0, 0, 1), color 0s;
		}
		& .slot-fx {
			opacity: 0;
			transform: translateY(1em) rotateX(-30deg);
			transition: all 0.5s cubic-bezier(0.2, 0, 0, 1), color 0s;
		}
		&:hover,
		&:focus {
			opacity: 1;
			color: var(--color-primary-500);
		}
		&.current {
			color: var(--color-primary-500);
			& .slot {
				opacity: 0;
				transform: translateY(-1em) rotateX(30deg) scale(0.75);
			}
			& .slot-fx {
				opacity: 1;
				transform: translateY(0) rotateX(0deg);
			}
			&.some-temp {
				color: var(--color-primary-500);
			}
		}
	}
</style>
