<script lang="ts">
	import { TOAST_TYPES } from '$lib/builders/toasts.svelte';
	import Variants from '$lib/components/patterns/variants.svelte';
	import { toasts } from '$lib/components/singletons/toasts-provider.svelte';

	const data = Object.values(TOAST_TYPES);

	let count = 0;
</script>

{#snippet toast(closeAttributes)}
	<button {...closeAttributes}>close!</button>
	Hello!
{/snippet}

<Variants title="Toast" {data}>
	{#snippet children(datum)}
		<button
			class="button"
			onclick={() => {
				toasts.add({ content: { body: `This is the ${count}<sup>th</sup> toast message.` } });
				count++;
			}}
		>
			Add {datum} text toast
		</button>
		<button class="button" onclick={() => toasts.add({ content: { snippet: toast } })}>
			Add {datum} snippet toast
		</button>
	{/snippet}
</Variants>
