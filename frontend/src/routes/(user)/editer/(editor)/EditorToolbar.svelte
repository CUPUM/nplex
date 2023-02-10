<script lang="ts" context="module">
	export const showToolbar = writable(true);
</script>

<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { cubicOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import { fly, scale } from 'svelte/transition';
	import { dirty } from './common';
</script>

{#if $showToolbar}
	<menu transition:fly|local={{ y: 12 }}>
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
{/if}

<style lang="scss">
	menu {
		position: sticky;
		margin-inline: 1.5rem;
		bottom: 1.5rem;
		align-self: stretch;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: row;
		height: 0;
	}
</style>
