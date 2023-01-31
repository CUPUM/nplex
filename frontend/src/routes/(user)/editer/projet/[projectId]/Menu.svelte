<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { dirty } from './common';
</script>

<menu>
	{#if Object.values($dirty).filter((v) => v).length}
		<div
			in:fly={{ y: 6, duration: 200, easing: cubicOut }}
			out:scale|local={{ start: 0.95, duration: 200 }}
		>
			<Button variant="cta" type="submit">
				Sauvegarder
				<Icon name="save" slot="trailing" />
			</Button>
		</div>
	{/if}
</menu>

<style lang="scss">
	menu {
		position: sticky;
		margin: 1.5rem;
		bottom: 1.5rem;
		align-self: flex-end;
		height: var(--ui-height);

		div {
			transform-origin: bottom right;
		}
	}
</style>
