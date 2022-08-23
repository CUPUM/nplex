<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Tooltip from '$components/primitives/Tooltip.svelte';
	import { cssSize } from '$utils/css';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let target: string;

	let mounted = false;
	let height: number = 0;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="aside-wrapper">
	<aside in:fly={{ x: -10, opacity: 0 }} bind:clientHeight={height} style:--height={cssSize(height)}>
		<menu class="general">
			<Tooltip message="Aide" place="right">
				<Button square variant="ghost">
					<Icon size="1.25em" name="info-circle" />
				</Button>
			</Tooltip>
		</menu>
		<menu class="form-controls">
			<Tooltip message="Enregistrer" place="right">
				<Button square form={target} type="submit" variant="ghost">
					<Icon size="1.25em" name="pen-plus" />
				</Button>
			</Tooltip>
			<Tooltip message="Effacer tout" place="right">
				<Button square form={target} type="reset" variant="ghost">
					<Icon size="1.25em" name="trash" />
				</Button>
			</Tooltip>
			<!-- If editing existing sheet, aka routeId = /editer/[someId], if admin or editor, etc... -->
			<Tooltip message="Publier la fiche" place="right">
				<Button form={target} square type="submit" variant="ghost">
					<Icon size="1.25em" name="upload" />
				</Button>
			</Tooltip>
			<!-- Add category-specific controls -->
		</menu>
	</aside>
</div>

<style lang="scss">
	.aside-wrapper {
		z-index: 1;
		position: absolute;
		grid-column: fullpad;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		padding: 2rem 0;
	}

	aside {
		position: sticky;
		top: calc(50% - var(--height) / 2);
		display: inline-flex;
		flex-direction: column;
		padding: 0.5rem;
		margin-left: 1rem;
		width: fit-content;
		padding: 3px;
		border-radius: 1em;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
	}

	menu {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		font-size: 1em;
	}
</style>
