<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fly, slide } from 'svelte/transition';

	let {
		errors,
		class: className,
		...labelProps
	}: { errors?: string[] } & HTMLAttributes<HTMLLabelElement> = $props();
</script>

{#if errors}
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label
		{...labelProps}
		class="field-errors"
		transition:slide={{ duration: 250, easing: expoOut, axis: 'y' }}
	>
		{#each errors as err, i}
			<span
				class="field-error"
				in:fly={{ duration: 150, delay: i * 50 }}
				out:fly={{ duration: 100, delay: (errors.length - 1 - i) * 25 }}
			>
				{err}
			</span>
		{/each}
	</label>
{/if}
