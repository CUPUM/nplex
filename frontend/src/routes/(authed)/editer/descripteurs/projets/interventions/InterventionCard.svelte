<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import Ripple from '$components/Ripple.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { PageData } from './$types';
	import { types } from './common';

	export let intervention: PageData['interventions'][number];

	$: intervention, (loading = null);

	let loading: number | null = null;

	const interventionKey = `intervention['${intervention.id}']`;
	const typeKey = `project_types['${intervention.id}']`;
</script>

<div class="intervention-card">
	<code class="intervention-id">{intervention.id.toString().padStart(2, '0')}</code>
	<input name="{interventionKey}.id" hidden readonly value={intervention.id} />
	<input name="{interventionKey}.category" hidden readonly value={intervention.category} />
	<dt>
		<input
			type="text"
			name="{interventionKey}.title"
			required
			placeholder="Titre"
			bind:value={intervention.title}
		/>
	</dt>
	<dd>
		<Modal>
			<Button rounded let:open slot="control" on:click={open}>
				<Icon name="text-left" slot="leading" />Description
			</Button>
			<svelte:fragment slot="header">Description de l'intervention</svelte:fragment>
			<TextArea variant="outlined" bind:value={intervention.description} />
			<svelte:fragment slot="footer" let:close>
				<Button type="button" on:click={close}>
					<Icon name="check" slot="leading" />Continuer
				</Button>
			</svelte:fragment>
		</Modal>
		<input
			type="hidden"
			name="{interventionKey}.description"
			placeholder="Description"
			value={intervention.description}
		/>
		<Toggle name="{interventionKey}.maybe_permit" bind:checked={intervention.maybe_permit}>
			<svelte:fragment slot="on">Requiert permis</svelte:fragment>
			<svelte:fragment slot="off">Sans permis</svelte:fragment>
		</Toggle>
		<div class="project-types">
			{#each $types as pt}
				{@const checked = intervention.project_type.includes(pt.id)}
				<Tooltip>
					<button
						class="project-type"
						data-checked={checked}
						type="submit"
						formaction="?/{checked
							? 'unset-type'
							: 'set-type'}&type={pt.id}&intervention={intervention.id}"
						on:pointerdown={() => (loading = pt.id)}
					>
						<Ripple />
						{pt.title}
						{#if loading === pt.id}
							<Loading />
						{/if}
					</button>
				</Tooltip>
			{/each}
		</div>
	</dd>
</div>

<style lang="scss">
	.intervention-card {
		position: relative;
		padding: var(--ui-pad-sm);
		border-radius: var(--ui-radius-sm);
		background-color: col(bg, 900);
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		gap: var(--ui-gutter-xs);
		align-items: center;

		@include tablet {
			// flex-direction: column;
			flex-wrap: wrap;
		}
	}

	.intervention-id {
		position: relative;
		top: -0.1em;
		opacity: 0.25;
	}

	input[type='text'] {
		position: relative;
		background-color: transparent;
		display: flex;
		align-items: center;
		padding-bottom: 0.2em;
		padding-inline: var(--ui-gutter-xs);
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

	dt {
		@include laptop {
			flex: 1;
			display: flex;
		}
	}

	dd {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: inherit;

		@include laptop {
			visibility: hidden;
			position: absolute;
		}
	}

	.project-types {
		display: flex;
		flex-direction: row;
		gap: 3px;
		font-size: var(--ui-text-sm);
	}

	.project-type {
		--ui-ripple-color: #{col(secondary, 900)};
		user-select: none;
		position: relative;
		cursor: pointer;
		color: col(fg, 700);
		background-color: col(bg, 100);
		border-radius: 99px;
		line-height: 1.2em;
		display: flex;
		align-items: center;
		padding-bottom: 0.2em;
		height: var(--ui-block-md);
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-inline: var(--ui-pad-sm);
		opacity: 0.35;
		transition: all 0.1s;

		&:hover {
			opacity: 0.5;
		}

		&[data-checked='true'] {
			opacity: 1;
			color: col(fg, 700);
			background-color: col(secondary, 100);
			box-shadow: var(--ui-shadow-sm);
		}
	}
</style>
