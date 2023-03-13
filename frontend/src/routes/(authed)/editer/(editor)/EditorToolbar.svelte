<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { editorIsDirty, EDITOR_FORM_ACTION, EDITOR_FORM_ID } from './common';
</script>

<menu>
	{#if $editorIsDirty}
		<div
			in:fly={{ y: 6, duration: 150, easing: cubicOut }}
			out:scale|local={{ start: 0.98, duration: 150, easing: cubicOut }}
		>
			<Button variant="cta" type="submit" form={EDITOR_FORM_ID} formaction="?/{EDITOR_FORM_ACTION}">
				Sauvegarder
				<Icon name="save" slot="trailing" />
			</Button>
		</div>
	{/if}
</menu>

<style lang="scss">
	menu {
		width: 100%;
		position: sticky;
		bottom: 1.5rem;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		flex-direction: row;
		height: 0;
		z-index: 99;
	}
</style>
