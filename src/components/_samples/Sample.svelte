<script lang="ts" context="module">
	export interface SampleParams {
		name: string,
		comp: { new (...args: any[]): any };
		props: {
			[key: string]: 'text' | 'number' | 'boolean' | 'children' | ReadonlyArray<string> | string[]
		}
	};
</script>

<script lang="ts">
	import { capitalize } from '$utils/helpers/strings';

	export let params: SampleParams;

	let values = {
		slot: 'Slot content'
	};
</script>

<article>
	<section id="component">
		<svelte:component
			this={params.comp}
			{...values}
		>
			{#if params.props.slot}
				{values.slot}
			{/if}
		</svelte:component>
	</section>
	<section id="props">
		{#each Object.keys(params.props) as propKey}
			<div class="prop">
				<div class="key">
					<p>{capitalize(propKey)} :</p>
				</div>
				<div class="default">
					<code>Default: </code>
				</div>
				<div class="input">
					{#if Array.isArray(params.props[propKey]) }
						{#each params.props[propKey] as option}
							<label>
								<span>{option}</span>
								<input type="radio" value={option} bind:group={values[propKey]} name={propKey} />
							</label>
						{/each}
					{:else if params.props[propKey] === 'text'}
						<input type="text" bind:value={values[propKey]}>
					{/if}
				</div>
			</div>
		{/each}
	</section>
</article>

<style lang="postcss">
	article {
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: white;
		margin: 1em 1em 1em 0;
		border-radius: 1em;
	}

	#component {
		display: flex;
		min-height: 50%;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid rgba(0,0,0, .1);
	}

	#props {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: var(--color-light-100);
	}

	.prop {
		display: flex;
		flex-direction: row;
		padding: 1rem;
		border-bottom: 1px solid rgba(0,0,0, .05);
	}

	.key,
	.default {
		display: flex;
		align-items: center;
		width: 200px;
	}

	.key p {
		font-weight: 600;
		padding-left: 1em;
	}

	code {
		padding: 1em;
		border-radius: 1.3em;
		box-shadow: 0 0 0 1px rgba(0,0,0, .1);
		color: var(--color-dark-500);
		opacity: .75;
	}

	.input {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1em;
	}

	label {
		user-select: none;
		font-weight: 400;
		cursor: pointer;
		font-size: var(--size-small);
		padding: 1em;
		border-radius: 1.3em;
		box-shadow: 0 0.5em 2em -0.5em rgba(0,0,0, .2);
	}
</style>