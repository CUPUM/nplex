<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { editorDirty, EDITOR_FORM_ID } from './common';

	$: dirty = Object.values($editorDirty).filter((v) => v).length;
</script>

<menu>
	{#if dirty}
		<div
			in:fly={{ y: 6, duration: 200, easing: cubicOut }}
			out:scale|local={{ start: 0.95, duration: 200 }}
		>
			<Button variant="cta" type="submit" form={EDITOR_FORM_ID}>
				Sauvegarder
				<Icon name="save" slot="trailing" />
			</Button>
		</div>
	{/if}
</menu>

<style lang="scss">
	menu {
		max-width: var(--ui-width-main);
		width: 100%;
		position: sticky;
		padding-inline: 1.5rem;
		margin-bottom: 1.5rem;
		bottom: 1.5rem;
		align-self: center;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: row;
		height: 0;
	}
</style>
