<script lang="ts" context="module">
	export interface TokenSetContext {
		vairant: 'default' | 'secondary' | 'ghost' | 'cta';
		inset: SizeInput;
	}
</script>

<script lang="ts">
	import { cssSize, type SizeInput } from '$utils/css';
	import { Ctx } from '$utils/keys';
	import { setContext } from 'svelte';

	export let variant: TokenSetContext['vairant'] = 'default';
	export let size: SizeInput = '1em';
	export let legend: string = undefined;

	setContext(Ctx.TokenSet, {
		variant,
		inset: '3px',
	});
</script>

<dl {...$$restProps} style:font-size={cssSize(size)}>
	{#if legend}
		<dt>{legend}</dt>
	{/if}
	<div>
		<slot />
	</div>
</dl>

<style lang="scss">
	dl {
		padding: 0;
		margin: 0;
		text-indent: 0;
		display: inline-block;
	}

	dt {
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
