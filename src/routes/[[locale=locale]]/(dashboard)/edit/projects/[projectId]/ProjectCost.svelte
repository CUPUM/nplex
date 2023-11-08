<script lang="ts">
	import DashboardFormField from '$lib/components/DashboardFormField.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import { Minus, Plus, X } from 'lucide-svelte';
	import { fieldProxy } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Fourchette de coûts',
		},
		en: {
			title: 'Cost range',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];

	const costProxy = fieldProxy(form, 'costRange');

	$: console.log($costProxy);
</script>

<DashboardFormField title={$t.title} centered>
	<Slider min={0} max={2_500_000} step={500} />
	<div id="project-cost">
		<div class="input-group">
			<div class="input-peer">
				<button class="button square ghost"><Minus class="button-icon" /></button>
			</div>
			<span class="input-affix">$ CAD</span>
			<input type="number" name="" id="" class="input" />
			<div class="input-peer">
				<button class="button square ghost"><Plus class="button-icon" /></button>
			</div>
		</div>
		<div class="input-group">
			<div class="input-peer">
				<button class="button square ghost" type="button" on:click={(e) => console.log(e)}>
					<Minus class="button-icon" />
				</button>
			</div>
			<span class="input-affix">$ CAD</span>
			<input type="number" name="" id="" class="input" />
			<div class="input-peer">
				<button class="button square ghost"><Plus class="button-icon" /></button>
			</div>
		</div>
		<button class="button danger" type="button"><X class="button-icon" /></button>
	</div>
</DashboardFormField>

<style lang="postcss">
	#project-cost {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
</style>
