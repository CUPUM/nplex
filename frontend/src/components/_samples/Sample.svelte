<script lang="ts" context="module">
	export interface SampleParams {
		name: string;
		comp: { new (...args: any[]): any };
		props: {
			[key: string]: 'text' | 'number' | 'boolean' | 'href' | 'icon' | ReadonlyArray<string> | string[];
		};
	}
</script>

<script lang="ts">
	import { icons } from '$utils/icons/icons';

	export let params: SampleParams;

	const hrefs = [
		{ desc: 'None', value: null },
		{ desc: 'Current', value: '/samples' },
		{ desc: 'Random', value: '/' + Math.random().toString(32) },
	];

	let values = {
		slot: 'Slot content',
		render: true,
	};
</script>

<article>
	<section id="component">
		{#if values.render}
			<svelte:component this={params.comp} {...values}>
				{#if params.props.slot}
					{values.slot}
				{/if}
			</svelte:component>
		{/if}
	</section>
	<section id="props">
		<div class="prop">
			<div class="key">Toggle component :</div>
			<div class="input">
				<label>
					<span>render</span>
					<input type="checkbox" bind:checked={values.render} />
				</label>
			</div>
		</div>
		{#each Object.keys(params.props) as propKey}
			<div class="prop">
				<div class="key">
					<p>{propKey} :</p>
				</div>
				<div class="input">
					{#if Array.isArray(params.props[propKey])}
						{#each params.props[propKey] as option}
							<label>
								<span>{option}</span>
								<input type="radio" value={option} bind:group={values[propKey]} name={propKey} />
							</label>
						{/each}
					{:else if params.props[propKey] === 'text'}
						<input type="text" bind:value={values[propKey]} />
					{:else if params.props[propKey] === 'href'}
						{#each hrefs as href}
							<label>
								<span>{href.desc}</span>
								<input type="radio" value={href.value} bind:group={values[propKey]} name={propKey} />
							</label>
						{/each}
					{:else if params.props[propKey] === 'boolean'}
						<input type="checkbox" bind:value={values[propKey]} />
					{:else if params.props[propKey] === 'number'}
						<input type="number" bind:value={values[propKey]} />
					{:else if params.props[propKey] === 'icon'}
						<select bind:value={values[propKey]}>
							<option selected value={null}>None</option>
							{#each Object.keys(icons) as iconName}
								<option value={iconName}>{iconName}</option>
							{/each}
						</select>
					{/if}
				</div>
				<div class="default">
					<code>Default: </code>
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
		padding: 0;
		overflow: hidden;
	}

	#component {
		display: flex;
		min-height: 25%;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	#props {
		position: relative;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: var(--color-light-100);
	}

	.prop {
		display: flex;
		flex-direction: row;
		padding: 1rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}

	.key,
	.default {
		display: flex;
		align-items: center;
		min-width: 140px;
		text-transform: capitalize;
	}

	.key p {
		font-weight: 600;
		padding-left: 1em;
	}

	code {
		padding: 1em;
		border-radius: 1.3em;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
		color: var(--color-dark-500);
		opacity: 0.75;
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
		box-shadow: 0 0.5em 2em -0.5em rgba(0, 0, 0, 0.2);
	}
</style>
