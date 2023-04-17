<script lang="ts">
	import { KEY } from '$utils/enums';
	import { onDestroy } from 'svelte';
	import { getFieldContext } from './Field.svelte';

	type D = $$Generic;

	export let data: D[];
	export let ordered: boolean = false;
	export let erasable: boolean = true;

	const { inputRef } = getFieldContext();

	function erase(all?: boolean) {
		if (all) {
			data = [];
		} else if (data.length) {
			data.splice(data.length - 1);
			data = data;
		}
	}

	function handleKey(e: Event) {
		const caretPosition =
			e.currentTarget && 'selectionStart' in e.currentTarget
				? e.currentTarget?.selectionStart
				: null;
		if (erasable && e instanceof KeyboardEvent && e.key === KEY.Backspace && caretPosition === 0) {
			erase(e.shiftKey || e.metaKey);
		}
	}

	$: if ($inputRef) {
		$inputRef.addEventListener('keydown', handleKey);
	}

	onDestroy(() => {
		$inputRef?.removeEventListener('keydown', handleKey);
	});
</script>

<svelte:element this={ordered ? 'ol' : 'ul'} class="field-tokens noscrollbar">
	{#each data as datum}
		<slot {datum} />
	{/each}
</svelte:element>

<style lang="scss">
	.field-tokens {
		display: flex;
		flex-direction: row;
		gap: 3px;
		font-size: 0.875em;
		overflow-x: scroll;
		flex: 1;
	}
</style>
