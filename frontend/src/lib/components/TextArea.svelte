<!--
	@component
	# Text Area
	Multiline text input component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'text-area-context';

	interface TextAreaContext {
		value: Writable<string>;
		textAreaRef: Writable<HTMLTextAreaElement>;
	}

	export function getTextAreaContext() {
		return getContext<TextAreaContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let id: string | undefined = undefined;
	export let value: string = '';

	const _value = writable(value);
	$: value = $_value;
	$: _value.set(value);

	let textAreaRef: HTMLTextAreaElement;
	const _textAreaRef = writable<typeof textAreaRef>();
	$: _textAreaRef.set(textAreaRef);

	setContext<TextAreaContext>(CTX_KEY, {
		value: _value,
		textAreaRef: _textAreaRef,
	});
</script>

<div class="text-area">
	<textarea name="" id="" bind:this={textAreaRef} bind:value />
	<div class="rendered" />
</div>

<style lang="scss">
</style>
