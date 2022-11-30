<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import { formid, route, routes } from './common';

	export let data: PageData;
	export let form: ActionData;

	let dirty: boolean = true;
	let mount = false;

	onMount(() => {
		mount = true;
	});
</script>

<header>
	<h1>Éditer</h1>
</header>
<slot />
{#if mount}
	<div class="sticker">
		<nav>
			<Button equi>Menu</Button>
			<ol>
				{#each routes as r}
					<li><a href={route($page.params.projectId, r.subpath)}>{r.title}</a></li>
				{/each}
			</ol>
		</nav>
		<menu class="nest" in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}>
			<Tooltip message="sauvegarder">
				<Button type="submit" variant="ghost" form={formid} equi>
					<Icon name="pen" />
				</Button>
			</Tooltip>
			<Tooltip message="Supprimer">
				<Button
					type="submit"
					formaction="?/delete"
					form={formid}
					variant="ghost"
					warning
					equi
				>
					<Icon name="trash" />
				</Button>
			</Tooltip>
		</menu>
	</div>
{/if}

<style lang="scss">
	header {
		padding: 4rem 2rem;
	}

	.sticker {
		position: sticky;
		bottom: 2rem;
		margin: 0 2rem;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}

	nav {
		padding: var(--ui-inset);
	}

	ol {
		position: absolute;
		bottom: 100%;
		padding: var(--ui-inset);
		background: col(bg, 000);
	}

	li {
		padding: 1rem;
	}

	menu {
		background: col(bg, 100, 0.8);
		display: flex;
		padding: var(--ui-inset);
		border-radius: calc(var(--ui-inset) + var(--ui-radius-md));
	}
</style>
