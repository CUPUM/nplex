<script lang="ts">
	import * as m from '$i18n/messages';
	import { decrement, increment } from '$lib/actions/increment';
	import Slider from '$lib/components/Slider.svelte';
	import SwitchThumb from '$lib/components/SwitchThumb.svelte';
	import ButtonIconPencil from '$lib/components/patterns/ButtonIconPencil.svelte';
	import type { SuperFormData } from '$lib/crud/validation/forms/types';
	import { PROJECT_COST_MAX, PROJECT_COST_MIN } from '$lib/db/constants';
	import { checked } from '$lib/utils/attributes';
	import { Minus, Plus, RotateCcw } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale, slide } from 'svelte/transition';
	import type { PageData } from './$types';

	type Form = SuperFormData<PageData['form']>;

	export let form: Form['form'];
	export let smallScale: boolean;

	let shift = false;

	function isShift(e: KeyboardEvent) {
		return e.shiftKey || e.ctrlKey;
	}
	function handleKeydown(e: KeyboardEvent) {
		shift = isShift(e);
	}
	function handleKeyup(e: KeyboardEvent) {
		shift = false;
	}

	const smallCostThreshold = 100_000;

	let minRef: HTMLInputElement;
	let maxRef: HTMLInputElement;
	$: mod = shift ? 10 : 1;
	$: step = smallScale ? 500 * mod : 5_000 * mod;
	$: min = smallScale ? PROJECT_COST_MIN : smallCostThreshold;
	$: max = smallScale ? smallCostThreshold : PROJECT_COST_MAX;
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<fieldet class="dashboard-subsection">
	<legend class="dashboard-subsection-header h5">
		{m.project_cost_title()}
	</legend>
	<div class="dashboard-subsection-content">
		{#if $form.costRange[0] == null}
			<button
				id="project-cost-placeholder"
				in:slide={{ easing: expoOut, duration: 250 }}
				type="button"
				on:click={() => {
					$form.costRange = [min, max];
				}}
			>
				<skeleton>
					<div class="input"></div>
					<div class="input"></div>
					<div class="input"></div>
				</skeleton>
				<div
					id="project-cost-init"
					class="button dashed bg-blur"
					in:scale={{ easing: expoOut, start: 0.9, duration: 250, delay: 250 }}
				>
					{m.project_cost_init()}
					<ButtonIconPencil />
				</div>
			</button>
		{:else}
			<div id="project-cost" in:slide={{ easing: expoOut, duration: 250 }}>
				<Slider {min} {max} {step} bind:value={$form.costRange} />
				<div id="project-cost-inputs" in:fly={{ y: -6, easing: expoOut, duration: 350 }}>
					<div class="input-group">
						<div class="input-peer">
							<button
								class="button square ghost"
								type="button"
								use:decrement={{ target: minRef, step }}
							>
								<Minus class="button-icon" />
							</button>
						</div>
						<input
							type="number"
							class="input"
							{min}
							{max}
							bind:this={minRef}
							bind:value={$form.costRange[0]}
						/>
						<span class="input-affix">$CA</span>
						<div class="input-peer">
							<button
								class="button square ghost"
								type="button"
								use:increment={{ target: minRef, step }}
							>
								<Plus class="button-icon" />
							</button>
						</div>
					</div>
					{m.to()}
					<div class="input-group">
						<div class="input-peer">
							<button
								class="button square ghost"
								type="button"
								use:decrement={{ target: maxRef, step }}
							>
								<Minus class="button-icon" />
							</button>
						</div>
						<input
							type="number"
							class="input"
							{min}
							{max}
							bind:this={maxRef}
							bind:value={$form.costRange[1]}
						/>
						<span class="input-affix">$CA</span>
						<div class="input-peer">
							<button
								class="button square ghost"
								type="button"
								use:increment={{ target: maxRef, step }}
							>
								<Plus class="button-icon" />
							</button>
						</div>
					</div>
				</div>
				<button
					class="button dashed"
					id="project-cost-reset"
					type="button"
					on:click={() => {
						$form.costRange = [null, null];
					}}
					in:fly={{ y: -6, delay: 500, easing: expoOut, duration: 250 }}
				>
					{m.project_cost_reset()}
					<RotateCcw />
				</button>
				<section id="cost-scale">
					<h3 class="h6">
						{m.project_cost_scale_title()}
					</h3>
					<div id="cost-scale-content">
						<p>
							{m.project_cost_scale_description()}
						</p>
						<menu class="switch outlined rounded">
							<button
								type="button"
								class="switch-item"
								{...checked(!smallScale)}
								on:click={() => {
									smallScale = false;
								}}
							>
								{m.project_cost_scale_normal()}
								<SwitchThumb current={!smallScale} />
							</button>
							<button
								type="button"
								class="switch-item"
								{...checked(smallScale)}
								on:click={() => {
									smallScale = true;
								}}
							>
								{m.project_cost_scale_small()}
								<SwitchThumb current={smallScale} />
							</button>
						</menu>
					</div>
				</section>
			</div>
		{/if}
	</div>
</fieldet>

<style>
	@import '$styles/scoped/dashboard';

	#project-cost-placeholder {
		cursor: pointer;
		position: relative;
		align-self: stretch;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: inherit;

		skeleton {
			opacity: 0.5;
			pointer-events: none;
			align-self: stretch;
			gap: inherit;
			display: grid;
			grid-template-columns: 1fr 1fr;

			> :first-child {
				grid-column: 1 / -1;
			}
		}

		#project-cost-init {
			position: absolute;
			box-shadow: 0 0.5em 3em var(--base-bg);
		}
	}

	#project-cost {
		display: flex;
		flex-direction: column;
		gap: inherit;
		align-items: center;
	}

	#cost-scale {
		display: flex;
		flex-direction: column;
		align-self: stretch;
		align-items: flex-start;
		padding: 2rem;
		background: color-mix(in srgb, var(--color-neutral-500) 5%, transparent);
		border-radius: var(--radius-md);

		#cost-scale-content {
			display: flex;
			align-self: stretch;
			flex-direction: row;
			gap: 1rem;
			align-items: center;
			justify-content: space-between;
		}

		p {
			line-height: var(--line-sparse);
			opacity: var(--opacity-dim);
			font-size: var(--size-sm);
			margin-top: var(--size-sm);
			max-width: 45ch;
		}

		.switch {
			font-size: var(--size-sm);
		}
	}

	#project-cost-inputs {
		font-size: var(--size-sm);
		align-self: stretch;
		display: flex;
		align-items: center;
		flex-direction: row;
		gap: var(--base-gutter);

		.input-group {
			flex: 1;
		}

		.input {
			min-width: 10ch;
		}
	}

	#project-cost-reset {
		font-size: var(--size-sm);
	}
</style>
