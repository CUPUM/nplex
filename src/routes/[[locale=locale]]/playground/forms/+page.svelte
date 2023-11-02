<script lang="ts">
	import { addToast } from '$lib/components/ToastsOutlet.svelte';
	import { superForm } from '$lib/forms/super-form.js';
	import { createLabel, melt } from '@melt-ui/svelte';
	import { Send } from 'lucide-svelte';

	export let data;
	const {
		form,
		message,
		constraints,
		enhance,
		errors,
		states,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data.form);

	let button1: HTMLButtonElement;
	let button2: HTMLButtonElement;

	const {
		elements: { root },
	} = createLabel();
</script>

<form use:enhance method="POST">
	<label class="input-group">
		<input type="text" name="text" class="input" {...$states.text} />
		<div class="input-peer">
			<button
				class="button square"
				type="submit"
				bind:this={button1}
				use:melt={$submitter(button1)}
			>
				<Send class="button-icon" />
			</button>
			<button
				class="button square"
				type="submit"
				bind:this={button2}
				use:melt={$submitter(button2)}
			>
				<Send class="button-icon" />
			</button>
		</div>
	</label>

	<button
		class="button"
		on:click={() => addToast({ data: { title: 'asdasd', description: 'asdasd' } })}
		type="button"
	>
		Dispatch
	</button>
</form>

<style lang="postcss">
</style>
