<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { Ctx } from '$utils/keys';
	import { getContext, onMount } from 'svelte';
	import Loading from './Loading.svelte';
	import type { SwitchContext } from './Switch.svelte';

	export let id: string;
	export let value: any;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	const ctx = getContext<SwitchContext>(Ctx.Switch);
	const { name, variant, currentRef, tempRef, group } = ctx;

	let labelRef: HTMLLabelElement;

	function setTemp() {
		tempRef.set(labelRef);
	}

	function clearTemp() {
		tempRef.set(null);
	}

	function setCurrent() {
		currentRef.set(labelRef);
	}

	$: if ($group === value) {
		setCurrent();
	}

	onMount(() => {
		if ($group === value) {
			setCurrent();
		}
	});
</script>

<label
	bind:this={labelRef}
	for={id}
	class:current={$group === value}
	class:some-temp={$tempRef}
	class={variant}
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
	<input {id} {value} {name} type="radio" bind:group={$group} on:change on:input />
	<span class="inner">
		<slot />
	</span>
	{#if loading}
		<Loading color="currentColor" />
	{/if}
</label>

<!-- <hr class="{ctx.variant} {ctx.orientation}" /> -->
<style lang="scss">
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
		transition: transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5), opacity 0.15s ease-in-out;
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

	/* Secondary theme */
	.secondary {
	}

	/* Ghost theme */
	.ghost {
	}

	/* Nav theme */
	.navbar {
		font-weight: 600;
		background-color: transparent;
		color: var(--color-dark-900);
		opacity: 0.8;
		& .inner {
			transform: translateY(0);
		}
		&:hover,
		&:focus {
			opacity: 1;
			color: var(--color-dark-900);
			& .inner {
				transform: translateY(-0.1em);
			}
		}
		&.current {
			color: var(--color-primary-700);
			&.some-temp {
				color: var(--color-primary-500);
			}
		}
	}

	/* Cta theme */
	.cta {
	}
</style>
