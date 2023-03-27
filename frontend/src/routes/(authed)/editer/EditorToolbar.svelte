<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { isDirty, updating } from './common';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from './constants';
	updating;
</script>

<menu>
	{#if $isDirty}
		<div
			in:fly={{ y: 6, duration: 200, easing: expoOut }}
			out:scale|local={{ start: 0.96, duration: 150, easing: cubicOut }}
		>
			<Button
				form={EDITOR_FORM_ID}
				formaction="?/{EDITOR_FORM_ACTION}"
				variant="cta"
				type="submit"
				loading={$updating}
			>
				Sauvegarder
				<Icon name="save" slot="trailing" />
			</Button>
		</div>
	{/if}
</menu>

<style lang="scss">
	menu {
		position: sticky;
		bottom: 1.5rem;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		flex-direction: row;
		height: var(--ui-unit-lg);
		margin-top: var(--ui-gutter-md);
		z-index: 99;
		transform-origin: bottom center;
	}
</style>
