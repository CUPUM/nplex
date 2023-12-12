<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { slide } from '$lib/motion/slide';
	import { composeMeshgradient } from '$lib/utils/mesh-gradient';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import EditableProjects from './EditableProjects.svelte';

	export let data;

	let scrollY = 0;
	let meshGradient: string;

	onMount(() => {
		meshGradient = composeMeshgradient({
			colors: [
				'var(--color-primary-700)',
				'var(--color-primary-600)',
				'var(--color-secondary-700)',
				'var(--color-primary-300)',
				'var(--color-secondary-100)',
				'var(--color-secondary-600)',
			],
			nodes: 7,
			spread: [25, 200],
		});
	});
</script>

<svelte:window bind:scrollY />
<article
	class="dashboard"
	class:has-header={$page.data.dashboard?.header}
	class:has-sidebar={$page.data.dashboard?.sidebar}
	class:has-footer={$page.data.dashboard?.footer}
>
	{#if $page.data.dashboard?.header}
		<header
			class="dashboard-header"
			in:slide={{ duration: 350, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 250, opacity: 0 }}
			style:background={meshGradient}
			style:transform="rotateX({Math.min(90, scrollY * 0.25)}deg)"
			style:opacity={Math.max(0, 1 - scrollY * 0.005)}
		>
			<svelte:component this={$page.data.dashboard.header} />
		</header>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<Sidebar>
			<svelte:component this={$page.data.dashboard.sidebar} />
		</Sidebar>
	{/if}
	<section class="dashboard-main" id="dashboard-main">
		<slot />
	</section>
	{#if $page.data.dashboard?.footer}
		<footer class="dashboard-footer">
			<svelte:component this={$page.data.dashboard.footer} />
		</footer>
	{/if}
</article>
<aside>
	<section class="editables">
		<h2 class="heading lg">
			<LangKey>{m.my_projects()}</LangKey>
		</h2>
		<EditableProjects projects={data.streamed.editableProjects} />
	</section>
	<section class="editables">
		<h2 class="heading lg">
			<LangKey>{m.my_orgs()}</LangKey>
		</h2>
	</section>
</aside>

<style lang="postcss">
	@import './dashboard.css';

	.editables {
		h2 {
			margin: 2rem;
		}
	}
</style>
