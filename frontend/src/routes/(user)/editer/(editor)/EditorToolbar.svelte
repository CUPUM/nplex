<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	export let dirty: boolean | undefined = undefined;
	export let formid: string | undefined = undefined;
</script>

<menu transition:fly|local={{ y: 12 }}>
	{#if dirty}
		<div
			in:fly={{ y: 6, duration: 200, easing: cubicOut }}
			out:scale|local={{ start: 0.95, duration: 200 }}
		>
			<Button variant="cta" type="submit" form={formid}>
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
		margin-top: 8rem;
		bottom: 1.5rem;
		align-self: center;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: row;
		height: 0;
	}
</style>
