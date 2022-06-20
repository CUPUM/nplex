<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { Ctx } from '$utils/contexts';
	import { getContext, onMount } from 'svelte';
	import Loading from './Loading.svelte';
	import type { SwitchContext } from './Switch.svelte';

	export let id: string;
	export let value: any;
	export let group: any;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	const ctx = getContext<SwitchContext>(Ctx.Switch);
	const temp = ctx.tempRef;
	const current = ctx.currentRef;
	let label: HTMLElement;

	function setTemp() {
		ctx.tempRef.set(label);
	}

	function clearTemp() {
		ctx.tempRef.set(null);
	}

	function setCurrent() {
		ctx.currentRef.set(label);
	}

	$: if (group === value) {
		setCurrent();
	}

	onMount(() => {
		if (group === value) {
			setCurrent();
		}
	});
</script>

<label
	for={id}
	bind:this={label}
	class:current={group === value}
	class={ctx.variant}
	class:some-temp={$temp}
	class:loading
	class:disabled
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mouseenter={setTemp}
	on:mouseleave={clearTemp}
	use:ripple={{}}
>
	<input {id} {value} name={ctx.name} type="radio" bind:group on:change on:input />
	<span class="inner">
		<slot />
	</span>
	{#if loading}
		<Loading color="currentColor" />
	{/if}
</label>

<!-- <hr class="{ctx.variant} {ctx.orientation}" /> -->
<style lang="postcss">
	label {
		z-index: 1;
		user-select: none;
		position: relative;
		cursor: pointer;
		font-weight: 500;
		display: inline-flex;
		padding: 0 1.2em;
		height: calc(var(--size) - 2 * var(--inset));
		justify-content: center;
		align-items: center;
		border-radius: calc(var(--radius) - var(--inset));
		transition: all 0.15s ease-out;
		letter-spacing: 0.01em;

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
		transition-property: transform, opacity;
		transition-timing-function: ease-in-out;
		transition-duration: 0.2s;
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
		color: var(--color-dark-100);
		&:hover,
		&:focus {
			color: var(--color-dark-900);
		}
		&.current {
			color: var(--color-light-500);
			&.some-temp {
				color: var(--color-dark-100);
			}
		}
	}

	/* Secondary theme */
	.secondary {
	}

	/* Ghost theme */
	.ghost {
	}

	/* Nav theme */
	.navbar {
		background-color: transparent;
		color: var(--color-dark-100);
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

	/* Cta theme */
	.cta {
	}
</style>
