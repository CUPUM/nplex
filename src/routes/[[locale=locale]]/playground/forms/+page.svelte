<script lang="ts">
	import { addToast } from '$lib/components/ToastsOutlet.svelte';
	import { superForm } from '$lib/forms/client.js';
	import { Send } from 'lucide-svelte';

	export let data;
	const {
		form,
		message,
		constraints,
		enhance,
		loading: { submitter },
	} = superForm(data.form);
</script>

<form use:enhance method="POST">
	<label class="input-group">
		<input type="text" name="text" class="input" />
		<div class="input-peer">
			<button class="button square" type="submit"><Send class="button-icon" /></button>
			<button class="button square" type="submit"><Send class="button-icon" /></button>
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
