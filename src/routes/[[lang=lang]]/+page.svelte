<script lang="ts">
	import { enhance } from '$app/forms';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { Send } from 'lucide-svelte';

	let { data } = $props();
</script>

<div class="p-lg flex flex-col items-start gap-[1em]">
	<a {...linkAttributes('/playground/components')} class="button button-link">
		Components playground
	</a>
</div>
<form class="p-lg" use:enhance method="POST" action="?/email">
	<button class="button" type="submit">
		Send test email
		<Send />
	</button>
</form>

<style>
</style>
