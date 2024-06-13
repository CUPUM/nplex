<script lang="ts">
	import Variants from '$lib/components/patterns/variants.svelte';
	import { ArrowRight, Bold, Code, File, Italic } from 'lucide-svelte';
	import { options } from '../states.svelte';

	const inputs = [
		{ name: 'Default', class: '' },
		{ name: 'Bordered', class: 'input-bordered' },
		{ name: 'Dashed', class: 'input-dashed' },
		{ name: 'Ghost', class: 'input-ghost' },
	];
</script>

<Variants title="Input" data={inputs}>
	{#snippet children(data)}
		<input type="text" class="input {data.class} {options.sizeMod}" placeholder={data.name} />
		<textarea class="input {data.class} {options.sizeMod}" placeholder={data.name}></textarea>
	{/snippet}
</Variants>
<Variants title="Grouped input" data={inputs}>
	{#snippet children(data)}
		<fieldset class="input-group {data.class} {options.sizeMod}">
			<div class="input-peer">
				<button class="button">A button</button>
			</div>
			<File />
			<input type="text" class="input" placeholder={data.name} />
			<div class="input-peer">
				<button class="button button-ghost aspect-square"><ArrowRight /></button>
			</div>
		</fieldset>
		<fieldset class="input-group {data.class} {options.sizeMod}">
			<textarea class="input" placeholder={data.name}></textarea>
			<div class="input-peer">
				<button class="button button-ghost aspect-square"><Italic /></button>
				<button class="button button-ghost aspect-square"><Bold /></button>
				<button class="button button-ghost aspect-square"><Code /></button>
			</div>
			<div class="input-peer">
				<button class="button">Save <ArrowRight /></button>
			</div>
		</fieldset>
	{/snippet}
</Variants>

<style>
</style>
