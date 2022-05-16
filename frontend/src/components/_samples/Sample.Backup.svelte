<script context="module" lang="ts">
	type SamplePropValues = (string | number | boolean)[];
	export type SampleParams = {
		comp: { new (...args: any[]): any };
		props: [string, SamplePropValues][];
		section?: 'row' | 'column' | 'nested';
	};
</script>

<script lang="ts">
	export let params: SampleParams;
	if (!params.section) params.section = 'row';
	const [propKey, propValues] = params.props[0];
	const nestedParams = {
		comp: params.comp,
		props: params.props.slice(1),
		section: params.section === 'row' ? 'column' : params.section === 'column' ? 'nested' : 'nested',
	};
</script>

{#each propValues as val}
	<section class={params.section} class:last={!nestedParams.props.length}>
		<code>{propKey}: {val}</code>
		<section class="content">
			{#if nestedParams.props.length}
				<svelte:self {...{ [propKey]: val }} params={nestedParams} {...$$restProps} on:click on:focus>
					<slot />
				</svelte:self>
			{:else}
				<svelte:component this={params.comp} {...{ [propKey]: val }} {...$$restProps} on:click on:focus>
					<slot />
				</svelte:component>
			{/if}
		</section>
	</section>
{/each}

<style lang="postcss">
	section:not(.content) {
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1em;
		padding: 0.5em;
		margin: 0.5em;

		&.last {
			border: none;
			padding: 0.5em;
			display: flex;
			flex: 1;
			align-items: flex-start;
			justify-content: centert;
		}
	}

	.row {
		& > :global .content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}
	}

	.col {
		flex: 1;
		display: flex;
		flex-direction: column;

		& > :global .content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	}

	.nested {
		display: flex;
		flex-direction: column;

		& > :global .content {
			display: flex;
			flex-direction: row;
		}
	}

	code {
		user-select: none;
		opacity: 0;
		display: inine-block;
		background-color: var(--color-light-900);
		border-radius: 0.5em;
		font-family: var(--font-misc);
		letter-spacing: 1px;
		font-weight: 600;
		color: var(--color-dark-300);
		padding: 0.5em;
		margin: 0 0 0.5em 0;
		font-size: var(--size-small);
		transition: all 0.3s ease;
	}
</style>
