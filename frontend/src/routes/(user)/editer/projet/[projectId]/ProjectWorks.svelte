<script lang="ts">
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { flip } from 'svelte/animate';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import ProjectFormGroup from './ProjectFormGroup.svelte';

	export let data: PageData;
	export let formproject: PageData['project'];
	export let typeTooltip: boolean;

	let timer: any;
	let worksHeight = tweened(0, { duration: 350, easing: cubicInOut });

	$: typeWorks =
		data.descriptors.types
			.find((t) => t.id === formproject.type_id)
			?.works.map((w) => ({ ...w, selected: false })) ?? [];
</script>

<ProjectFormGroup>
	<svelte:fragment slot="legend">
		Travaux
		<fieldset
			disabled={!formproject.type_id}
			id="works-search"
			on:pointerenter={() => {
				if (!formproject.type_id) {
					timer = setTimeout(() => {
						typeTooltip = true;
					}, 250);
				}
			}}
			on:pointerleave={() => {
				timer = clearTimeout;
				typeTooltip = false;
			}}
		>
			<Field>
				<FieldIcon slot="leading" name="search" />
			</Field>
		</fieldset>
	</svelte:fragment>
	<ul id="works-selected">
		{#if formproject.work_ids.length}
			{#each formproject.work_ids as work_id, i (work_id)}
				{@const w = data.descriptors.works.find((work) => work.id === work_id)}
				<li
					in:scale={{ delay: i * 20, duration: 200, start: 0.9 }}
					out:scale={{ duration: 150, start: 0.8 }}
					animate:flip={{ delay: i * 20, duration: 150 }}
				>
					<Tooltip message={w.description}>
						<span class="token">
							<span>{w?.title}</span>
							<label class="clear {ICON_CLASSES.HOVER}">
								<Icon name="cross" strokeWidth="2" />
								<input
									hidden
									type="checkbox"
									name="work_id"
									bind:group={formproject.work_ids}
									value={w.id}
								/>
							</label>
						</span>
					</Tooltip>
				</li>
			{/each}
		{:else if formproject.type_id}
			<p class="info" in:fly={{ y: 6, duration: 350 }}>Sélectionnez un ou plusieurs travaux...</p>
		{/if}
	</ul>
	<div style="position: relative; width: 100%; overflow-y: hidden">
		{#if formproject.type_id}
			<div style:height="{$worksHeight}px" />
			<ul id="works" bind:clientHeight={$worksHeight}>
				{#each typeWorks as w, i (w.id)}
					<li
						in:scale={{ delay: i * 20, duration: 200, start: 0.9, opacity: 0 }}
						animate:flip={{ delay: i * 20, duration: 150 }}
					>
						<Tooltip message={w.description}>
							<label class="token">
								<span>{w.title}</span>
								<input
									hidden
									type="checkbox"
									name="work_id"
									bind:group={formproject.work_ids}
									value={w.id}
								/>
							</label>
						</Tooltip>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</ProjectFormGroup>

<style lang="scss">
	#works-search {
		font-size: var(--ui-text-md);
		margin-top: var(--ui-gutter);
	}

	#works {
		top: 0;
		display: flex;
		position: absolute;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: var(--ui-text-sm);
		color: col(fg, 900, 0.8);
		min-height: var(--ui-height);

		li {
			flex: none;
		}
	}

	.token {
		font-weight: 400;
		display: flex;
		height: var(--ui-height);
		flex-direction: row;
		align-items: center;
		border-radius: var(--ui-radius-md);
		gap: 0;
		// border-radius: 99px;
		// border: 1px solid col(fg, 100, 0.2);
		background: col(bg, 500);
		cursor: pointer;
		transition: all 0.15s var(--ui-ease-out);

		&:hover {
			background: col(primary, 100, 0.3);
			color: col(primary, 700);
			// border: 1px solid transparent;
		}

		span {
			position: relative;
			display: block;
			top: -0.1em;
			padding-inline: var(--ui-pad-x);
		}
	}

	#works-selected {
		min-height: var(--ui-height);
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.75em;

		.token {
			--inset: 8px;
			cursor: default;
			background: col(fg, 500);
			color: col(bg, 500);
			padding: var(--inset);
			padding-left: 0;

			span {
				padding-right: 0.5em;
			}

			&:hover {
				// color: col(bg, 900);
				// background: col(fg, 900);
				// box-shadow: 0 0.5em 2em -1em black;

				.clear {
					color: col(error, 300);
				}
			}
		}

		.clear {
			cursor: pointer;
			height: 100%;
			aspect-ratio: 1 / 1;
			background: transparent;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1rem;
			border-radius: 99px;
			transition: all 0.15s;
			// border-radius: calc(var(--ui-radius-md) - var(--inset));

			&:hover {
				color: col(error, 100);
				background: col(error, 100, 0.1);
			}
		}
	}

	.info {
		font-size: 1rem;
		position: absolute;
		opacity: 0.5;
		font-weight: 300;
		margin-top: 1rem;
	}
</style>
