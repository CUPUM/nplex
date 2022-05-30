<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { cssSize, type CSSSizeValue } from '$utils/helpers/css';
	import { providers } from '$utils/providers';

	export let provider: keyof typeof providers = undefined;
	export let size: number | CSSSizeValue = '1em';
	export let display: 'inline' | 'block' = 'inline';
	export let warning: boolean = false;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let message: string = undefined;
	export let loading: boolean = false;
</script>

<button
	style:font-size={cssSize(size)}
	class={display}
	class:warning
	class:active
	disabled={disabled || loading}
	{...$$restProps}
	on:click
	on:focus
	use:ripple
>
	<span id="logo">
		{@html providers[provider].svg}
		<!-- <img src={providers[provider].logoFilepath} alt="logo {provider}" /> -->
	</span>
	<div id="label">
		<slot />
	</div>
</button>

<style lang="postcss">
	button {
		/* Base */
		--size: 2.8em;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		text-decoration: none;
		height: var(--size);
		min-height: var(--size);
		min-width: var(--size);
		border-radius: 1em;
		padding-block: 0;
		padding-inline: 1em;
		margin: 0;
		font-family: var(--font-main);
		box-shadow: 0 0 0 1px var(--color-light-700);
		font-weight: 500;
		outline-width: 2px;
		outline-style: solid;
		outline-color: transparent;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		grid-template-columns: 1fr auto minmax(0, 1fr);
		background-color: var(--color-light-100);
		transition: all 0.2s ease-out;

		&:hover {
			background-color: var(--color-light-500);
			color: var(--color-primary-500);
			transition: all 0s;
		}

		&:focus {
			outline-color: var(--color-primary-100);
		}

		&.active {
			background-color: var(--color-light-900);
			color: var(--color-primary-900);
		}

		&.warning {
			background-color: var(--color-error-100);
			color: var(--color-error-700);
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}
	}

	#logo {
		position: relative;
		height: 1.3em;
		margin-right: 1em;
		justify-self: left;

		/* & img, */
		& :global svg {
			height: 100%;
			width: auto;
		}
	}

	#label {
		flex: 1;
		position: relative;
		top: -0.05em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.inline {
		display: inline-grid;
	}

	.block {
		display: grid;
		width: 100%;
	}
</style>
