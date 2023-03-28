<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { flip } from 'svelte/animate';
	import { cubicIn, cubicOut, elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { ValueOf } from 'ts-essentials';
	import { project } from '../common';

	const LEVEL_TYPES = {
		Mezzanine: 'mezzanine',
		Main: 'main',
		Basement: 'basement',
		Ground: 'ground',
	} as const;
	type LevelType = ValueOf<typeof LEVEL_TYPES>;

	type Level = {
		type: LevelType;
		intervention: boolean;
		index: number;
	};

	const ground = {
		type: LEVEL_TYPES.Ground,
		index: 0,
		ground: true,
	} as const;

	$: allLevels = [
		...$project.building_levels_mezzanine.map((lvl, index) => ({
			intervention: lvl ?? false,
			index,
			type: LEVEL_TYPES.Mezzanine,
		})),
		...$project.building_levels_main.map((lvl, index) => ({
			intervention: lvl ?? false,
			index,
			type: LEVEL_TYPES.Main,
		})),
		ground,
		...$project.building_levels_basement.map((lvl, index) => ({
			intervention: lvl ?? false,
			index,
			type: LEVEL_TYPES.Basement,
		})),
	] satisfies (Level | typeof ground)[];

	function addLevel(type: LevelType) {
		switch (type) {
			case LEVEL_TYPES.Mezzanine:
				$project.building_levels_mezzanine = [...$project.building_levels_mezzanine, false];
				break;
			case LEVEL_TYPES.Main:
				$project.building_levels_main = [...$project.building_levels_main, false];
				break;
			case LEVEL_TYPES.Basement:
				$project.building_levels_basement = [...$project.building_levels_basement, false];
				break;
		}
	}

	function removeLevel(type: LevelType, index: number) {
		switch (type) {
			case LEVEL_TYPES.Mezzanine:
				$project.building_levels_mezzanine.splice(index, 1);
				$project.building_levels_mezzanine = $project.building_levels_mezzanine;
				break;
			case LEVEL_TYPES.Main:
				$project.building_levels_main.splice(index, 1);
				$project.building_levels_main = $project.building_levels_main;
				break;
			case LEVEL_TYPES.Basement:
				$project.building_levels_basement.splice(index, 1);
				$project.building_levels_basement = $project.building_levels_basement;
				break;
		}
	}
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Hauteur et étages</h3>
	<p class="subtle">Quelle est la hauteur hors-sol du bâtiment?</p>
	<Field
		type="number"
		suffix="&emsp;m"
		placeholder="Hauteur du bâtiment"
		style="max-width: 250px;"
	/>
	<p>Combien d'étages comporte le bâtiment concerné?</p>
	<div class="fields">
		<fieldset class="buttons">
			<Tooltip message="Aussi appelé mezzanine">
				<Button variant="dashed" rounded on:click={() => addLevel(LEVEL_TYPES.Mezzanine)}>
					<Icon name="plus" slot="leading" />
					Hors-toit
				</Button>
			</Tooltip>
			<Button variant="dashed" rounded on:click={() => addLevel(LEVEL_TYPES.Main)}>
				<Icon name="plus" slot="leading" />
				Étage
			</Button>
			<Button variant="dashed" rounded on:click={() => addLevel(LEVEL_TYPES.Basement)}>
				<Icon name="plus" slot="leading" />
				Sous-sol
			</Button>
		</fieldset>
		<ol class="diagram">
			{#each allLevels as level, i (`${level.type}-${level.index}`)}
				<li
					animate:flip={{ duration: 100, easing: cubicOut, delay: i }}
					class="level {level.type}"
					class:intervention={'intervention' in level && level.intervention}
					in:scale={{ start: 0.9, duration: 250, easing: elasticOut }}
					out:scale|local={{ start: 0.95, duration: 150, easing: cubicIn }}
				>
					{#if 'ground' in level}
						<hr />
					{:else}
						<span class="level-type">
							{#if level.type === LEVEL_TYPES.Mezzanine}
								Hors-toit
							{:else if level.type === LEVEL_TYPES.Main}
								Étage {$project.building_levels_main.length - level.index}
							{:else if level.type === LEVEL_TYPES.Basement}
								Sous-sol
							{/if}
						</span>
						<Tooltip message="Supprimer ce niveau">
							<button
								type="button"
								class="remove-level"
								on:click={() => {
									removeLevel(level.type, level.index);
								}}
							>
								<Icon name="cross" />
							</button>
						</Tooltip>
						<input type="hidden" name="building_levels_{level.type}" value={level.intervention} />
						{#if level.type === 'mezzanine'}
							<Tooltip message="Indiquez si ce hors-toit est touché par le projet">
								<Toggle
									variant="default"
									bind:checked={$project.building_levels_mezzanine[level.index]}
								/>
							</Tooltip>
						{:else if level.type === 'main'}
							<Tooltip message="Indiquez si cet étage est touché par le projet">
								<Toggle
									variant="default"
									bind:checked={$project.building_levels_main[level.index]}
								/>
							</Tooltip>
						{:else if level.type === 'basement'}
							<Tooltip message="Indiquez si ce sous-sol est touché par le projet">
								<Toggle
									variant="default"
									bind:checked={$project.building_levels_basement[level.index]}
								/>
							</Tooltip>
						{/if}
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</fieldset>

<style lang="scss">
	.fields {
		display: flex;
		flex-direction: row;
		gap: 3rem;
		// flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		margin-top: 3rem;

		@include desktop {
			align-items: center;
			flex-direction: column-reverse;
		}
	}

	.buttons {
		font-size: var(--ui-text-xs);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 3px;
		position: sticky;
		top: var(--ui-sticky-top);
		flex: none;

		@include desktop {
			flex-direction: row;
		}
	}

	.diagram {
		display: flex;
		flex: 1;
		width: 100%;
		align-items: center;
		flex-direction: column;
		gap: 6px;
		max-width: var(--ui-width-sm);
	}

	.level {
		flex: none;
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		position: relative;
		align-items: center;
		height: 3.5rem;
		justify-content: center;
		padding: 0 1em;
		border-radius: var(--ui-radius-md);
		font-size: var(--ui-text-sm);
		background-color: col(fg, 100, 0.1);
		// border: 1px solid col(fg, 100, 0.1);
	}

	.intervention {
		--pattern-color: #{col(fg, 500)} !important;
		background-color: col(fg, 100) !important;
	}

	.mezzanine {
		--pattern-color: #{col(bg, 700)};
		--pattern-size: 1.5em;
		width: 75%;
		background: radial-gradient(
				circle at 100% 50%,
				transparent 20%,
				var(--pattern-color) 21%,
				var(--pattern-color) 34%,
				transparent 35%,
				transparent
			),
			radial-gradient(
					circle at 0% 50%,
					transparent 20%,
					var(--pattern-color) 21%,
					var(--pattern-color) 34%,
					transparent 35%,
					transparent
				)
				0 calc(-0.5 * var(--pattern-size));
		background-repeat: repeat;
		background-size: calc(0.75 * var(--pattern-size)) var(--pattern-size);
		background-color: col(fg, 100, 0.1);
	}

	.main {
		width: 100%;
		background-color: col(fg, 100, 0.1);
	}

	.basement {
		--pattern-color: #{col(bg, 700)};
		--pattern-size: 1em;
		--pattern-offset: calc(0.5 * var(--pattern-size));
		width: 100%;
		background-image: radial-gradient(var(--pattern-color) 30%, transparent 30%),
			radial-gradient(var(--pattern-color) 30%, transparent 30%);
		background-repeat: repeat;
		background-position: 0 0, var(--pattern-offset) var(--pattern-offset);
		background-size: var(--pattern-size) var(--pattern-size);
		background-color: col(fg, 100, 0.1);
	}

	.ground {
		height: 1.5px;
		background-color: transparent;
		border-bottom: 1.5px dashed col(fg, 100, 0.2);
		width: 50%;
		aspect-ratio: unset;
	}

	.level-type {
		display: block;
		padding: 0.25em 1em;
		border-radius: 99px;
		background-color: col(bg, 900);
		font-size: var(--ui-text-xs);
		text-transform: uppercase;
		letter-spacing: 0.2px;
		font-weight: 450;
		color: col(fg, 000);
		.intervention & {
			color: col(bg, 100);
			background-color: col(fg, 300);
		}
	}

	.remove-level {
		position: relative;
		aspect-ratio: 1;
		height: var(--ui-unit-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: col(fg, 100);
		background-color: col(bg, 900);

		&:hover {
			background-color: col(error, 900);
			color: col(error, 100);
		}
	}
</style>
