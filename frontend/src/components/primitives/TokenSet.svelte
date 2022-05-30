<script lang="ts" context="module">
	export interface TokenSetContext {
		vairant: 'default' | 'secondary' | 'ghost' | 'cta';
		inset: CSSSizeValue;
	}
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { cssSize, type CSSSizeValue } from '$utils/helpers/css';
	import { setContext } from 'svelte';

	export let variant: TokenSetContext['vairant'] = 'default';
	export let size: number | CSSSizeValue = '1em';
	export let legend: string = undefined;

	setContext(Ctx.TokenSet, {
		variant,
		inset: '3px',
	});
</script>

<ul id="set" {...$$restProps} style:font-size={cssSize(size)}>
	{#if legend}
		<legend>{legend}</legend>
	{/if}
	<div>
		<slot />
	</div>
</ul>

<style lang="postcss">
	ul {
		padding: 0;
		margin: 0;
		text-indent: 0;
		display: block;
	}

	legend {
		font-weight: 400;
		font-size: var(--size-large);
		padding: 0.5em;
		color: var(--color-dark-500);
	}

	div {
		padding: 1em;
		border-radius: 1rem;
		border: 1px solid var(--color-light-700);
	}
</style>
