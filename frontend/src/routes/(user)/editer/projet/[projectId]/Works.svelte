<script lang="ts">
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { debounce } from '$utils/modifiers';
	import Fuse from 'fuse.js';
	import { flip } from 'svelte/animate';
	import { cubicInOut, expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { crossfade, fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import { descriptors, dirty, _type_id } from './common';

	export let work_ids: PageData['project']['work_ids'];

	let _work_ids = [...work_ids];

	$: $dirty.work_ids =
		selected.length !== (work_ids.length ?? []) ||
		!selected.every((work) => (work_ids ?? []).indexOf(work.id) > -1);

	$: available = $descriptors.types.find((t) => t.id === $_type_id)?.works ?? [];

	$: selected = _work_ids.reduce((acc, curr) => {
		const w = available.find((w) => w.id === curr);
		if (w) {
			acc.push(w);
		}
		return acc;
	}, Array<(typeof available)[number]>(0));

	let worksHeight = tweened(0, { duration: 350, easing: cubicInOut });
	let selectedWorksHeight = tweened(0, { duration: 150, easing: cubicInOut });
	let searchResults: typeof available | null = null;

	const [send, receive] = crossfade({
		duration: (d) => 0.5 * d + 150,
		easing: expoOut,
		fallback: (node: Element) => scale(node, { duration: 150, start: 0.94 }),
	});

	function add(wid: number) {
		if (_work_ids.indexOf(wid) < 0) {
			_work_ids = [..._work_ids, wid];
		}
	}

	const fuse = new Fuse(available, { keys: ['title', 'description'], threshold: 0.5 });
	$: fuse.setCollection(available);

	const handleSearch = debounce((e: Event) => {
		if (e.target instanceof Element && 'value' in e.target) {
			if (typeof e.target.value === 'string' && e.target.value.length) {
				searchResults = fuse.search(e.target.value).map((r) => r.item);
			} else {
				searchResults = null;
			}
		}
	}, 250);
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Travaux</legend>
	<section class="formfields">
		<fieldset id="search-works" disabled={_type_id === null}>
			<Field placeholder="Chercher un type de travail" variant="outlined" on:input={handleSearch}>
				<FieldIcon slot="leading" name="search" />
			</Field>
		</fieldset>
		<fieldset id="inputs-tokens">
			{#if $_type_id !== null}
				<div class="height-wrap" style="overflow: visible; margin-bottom: 1rem">
					<div style:height="{$selectedWorksHeight}px" aria-hidden />
					<ul id="selected-works" bind:clientHeight={$selectedWorksHeight}>
						{#each selected as w, i (w.id)}
							<li
								in:receive|local={{ key: w.id }}
								out:send|local={{ key: w.id }}
								animate:flip={{ duration: 150 }}
							>
								<Tooltip message={w.description}>
									<span class="token">
										<span>{w.title}</span>
										<label class="clear {ICON_CLASS.hover}">
											<Icon name="cross" strokeWidth={2} />
											<input
												hidden
												type="checkbox"
												name="work_id"
												bind:group={_work_ids}
												value={w.id}
											/>
										</label>
									</span>
								</Tooltip>
							</li>
						{/each}
						{#if !selected.length}
							<p class="info" transition:fly|local={{ y: 6, duration: 250 }}>
								Sélectionnez un ou plusieurs travaux...
							</p>
						{/if}
					</ul>
				</div>
				<div class="height-wrap" style="overflow: visible;">
					<div style:height="{$worksHeight}px" aria-hidden />
					<ul id="works" bind:clientHeight={$worksHeight}>
						{#each (searchResults ?? available).filter((w) => !_work_ids.includes(w.id)) as w, i (w.id)}
							<li
								in:receive|local={{ key: w.id }}
								out:send|local={{ key: w.id }}
								animate:flip={{ duration: 100 }}
							>
								<Tooltip message={w.description}>
									<button class="token" on:pointerdown={() => add(w.id)} type="button">
										<span>{w.title}</span>
									</button>
								</Tooltip>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				<p class="info">Sélectionnez d'abord un type de projet.</p>
			{/if}
		</fieldset>
	</section>
</fieldset>

<style lang="scss">
	#inputs-tokens {
		overflow-y: hidden;
	}

	.height-wrap {
		position: relative;
		width: 100%;
	}

	#search-works {
		font-size: 1rem;
		padding-bottom: 1.5rem;
		max-width: var(--ui-width-sm);
	}

	#works {
		top: 0;
		display: flex;
		position: absolute;
		flex-direction: row;
		align-items: flex-start;
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
		border: none;
		user-select: none;
		font-weight: 400;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 3em;
		gap: 0;
		border-radius: 1.5em;
		background: col(fg, 500, 0.05);
		color: col(fg, 100, 0.8);
		// border: 1px solid col(fg, 100, 0.1);
		cursor: pointer;
		transition: all 0.1s var(--ui-ease-out);

		&:hover {
			// border: 1px solid col(primary, 500, 0.1);
			background: col(primary, 300, 0.2);
			color: col(primary, 700);
		}

		span {
			position: relative;
			display: block;
			top: -0.05em;
			padding-inline: var(--ui-pad-x);
		}
	}

	#selected-works {
		position: absolute;
		width: 100%;
		top: 0;
		z-index: 1;
		min-height: var(--ui-height);
		font-size: var(--ui-text-sm);
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;

		.token {
			--inset: 6px;
			cursor: default;
			background: col(fg, 300);
			color: col(bg, 500);
			padding: var(--inset);
			padding-left: 0;

			span {
				padding-right: 0.5em;
			}

			&:hover {
				.clear {
					opacity: 1;
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
			opacity: 0.5;
			transition: all 0.15s;

			&:hover {
				opacity: 1;
				color: col(error, 500);
				background: col(error, 100, 0.2);
			}
		}
	}

	.info {
		font-size: 1rem;
		position: absolute;
		color: col(fg, 100, 0.35);
		margin-top: 1rem;
		text-indent: 0.5em;
	}
</style>
