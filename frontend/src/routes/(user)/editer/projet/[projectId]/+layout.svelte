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
	let canPublish = false;

	$: canPublish = data.session?.user
		? ['admin', 'editor', 'nplex'].includes(data.session.user.role)
		: false;

	onMount(() => {
		mount = true;
	});
</script>

<header>
	<h1>Éditer</h1>
</header>
<slot />
{#if mount}
	<div class="bar">
		<nav>
			<Button equi><Icon name="view-list" /></Button>
			<ol>
				{#each routes as r}
					<li><a href={route($page.params.projectId, r.subpath)}>{r.title}</a></li>
				{/each}
			</ol>
		</nav>
		<menu class="nest" in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}>
			<Button href="" equi variant="ghost">
				<Icon name="chevron-left" />
			</Button>
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
			<Tooltip message="Sauvegarder">
				<Button type="submit" variant="ghost" form={formid} equi>
					<Icon name="save" />
				</Button>
			</Tooltip>
			<Tooltip
				message={canPublish ? 'Publier' : 'Votre rôle ne permet pas de publier des fiches'}
			>
				<div>
					<Button type="submit" variant="ghost" form={formid} disabled={!canPublish} equi>
						<Icon name="announcement" />
					</Button>
				</div>
			</Tooltip>
			<Button href="" equi variant="ghost">
				<Icon name="chevron-right" />
			</Button>
		</menu>
	</div>
{/if}

<style lang="scss">
	header {
		padding: 4rem 2rem;
	}

	.bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		position: sticky;
		bottom: 2rem;
		margin: 0 2rem;
		margin-top: 5rem;
	}

	nav {
		padding: var(--ui-inset);
	}

	ol {
		display: flex;
		flex-direction: row;
		position: absolute;
		bottom: 100%;
		padding: var(--ui-inset);
		background: col(bg, 000);
	}

	li {
		padding: 1rem;
	}

	menu {
		margin: 0 auto;
		background: col(bg, 100, 0.8);
		display: flex;
		align-items: center;
		padding: var(--ui-inset);
		border-radius: calc(var(--ui-inset) + var(--ui-radius-md));
	}
</style>
