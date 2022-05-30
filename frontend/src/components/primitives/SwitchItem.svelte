<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { Ctx } from '$utils/contexts';
	import type { SvelteProps } from '$utils/helpers/types';
	import { getContext, onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import type { SwitchContext } from './Switch.svelte';

	export let id: string;
	export let value: any;
	export let group: any;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let icon: SvelteProps<Icon>['name'] = undefined;
	export let iconPosition: 'before' | 'after' = 'before';

	const ctx = getContext<SwitchContext>(Ctx.Switch);
	const temp = ctx.temp;
	const current = ctx.current;
	let label: HTMLElement;

	function setTemp() {
		ctx.temp.set(label);
	}

	function clearTemp() {
		ctx.temp.set(null);
	}

	function setCurrent() {
		ctx.current.set(label);
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
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	on:mouseenter={setTemp}
	on:mouseleave={clearTemp}
	use:ripple={{}}
>
	<input {id} {value} name={ctx.name} type="radio" bind:group on:change on:input />
	{#if icon}
		<Icon id="icon" name={icon} />
	{/if}
	<span id="inner">
		<slot />
	</span>
</label>

<!-- <hr class="{ctx.variant} {ctx.orientation}" /> -->
<style lang="postcss">
	label {
		z-index: 1;
		user-select: none;
		position: relative;
		cursor: pointer;
		font-weight: 400;
		display: inline-flex;
		padding: 0 1em;
		height: var(--itemsize);
		justify-content: center;
		align-items: center;
		border-radius: calc(var(--radius) - var(--inset));
		transition: all 0.15s ease-out;

		&.current {
			pointer-events: none;
			cursor: default;
		}
	}

	#inner {
		display: block;
		position: relative;
		top: -0.1em;
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
		color: var(--color-dark-500);
		&:hover,
		&:focus {
			color: var(--color-dark-900);
		}
		&.current {
			opacity: 1;
			color: var(--color-light-500);
			&.some-temp {
				color: var(--color-primary-300);
			}
		}
	}

	/* Cta theme */
	.cta {
	}
</style>
