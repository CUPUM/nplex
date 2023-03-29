<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { PageData } from './$types';
	import { types } from './common';

	export let intervention: PageData['interventions'][number];

	const formKey = `intervention['${intervention.id}']`;
</script>

<div class="intervention-card">
	<code class="intervention-id">{intervention.id.toString().padStart(2, '0')}</code>
	<dt>
		<input
			type="text"
			name="{formKey}.title"
			required
			placeholder="Titre"
			value={intervention.title}
		/>
	</dt>
	<dd>
		<input
			type="text"
			name="{formKey}.description"
			placeholder="Description"
			value={intervention.description}
		/>
		<Toggle>Requiert potentiellement un permi</Toggle>
	</dd>
	<div class="project-types">
		{#each $types as pt}
			{@const inputId = `${intervention.id}-${pt.id}-input`}
			<Tooltip>
				<input type="checkbox" id={inputId} hidden />
				<label class="project-type" for={inputId}>
					<Ripple />
					{pt.title}
				</label>
			</Tooltip>
		{/each}
	</div>
</div>

<style lang="scss">
	.intervention-card {
		position: relative;
		padding: var(--ui-inset);
		border-radius: var(--ui-radius-sm);
		background-color: col(bg, 900);
		display: flex;
		flex-direction: row;
		gap: 3px;
		align-items: center;
	}

	.intervention-id {
		position: relative;
		top: -0.1em;
		opacity: 0.25;
		padding-inline: var(--ui-pad-md);
	}

	input[type='text'] {
		position: relative;
		background-color: transparent;
		display: flex;
		align-items: center;
		padding-bottom: 0.2em;
		padding-inline: var(--ui-gap-sm);
		min-height: var(--ui-block-lg);
		flex: 1;
		border-radius: var(--ui-radius-sm);
		transition: all 0.1s;

		&:hover {
			background-color: col(fg, 100, 0.05);
		}

		&:focus {
			background-color: col(fg, 100, 0.1);
		}
	}

	dd {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: row;
		gap: inherit;
	}

	.project-types {
		display: flex;
		flex-direction: row;
		gap: 3px;
	}

	.project-type {
		--ui-ripple-color: #{col(secondary, 900)};
		position: relative;
		cursor: pointer;
		color: col(fg, 700);
		background-color: col(bg, 100);
		border-radius: 99px;
		display: flex;
		align-items: center;
		padding-bottom: 0.2em;
		height: var(--ui-block-sm);
		padding-inline: var(--ui-pad-sm);
		opacity: 0.35;
		transition: all 0.1s;

		&:hover {
			opacity: 0.5;
		}

		:checked + & {
			opacity: 1;
			color: col(fg, 700);
			background-color: col(secondary, 100);
			box-shadow: var(--ui-shadow-sm);
		}
	}
</style>
