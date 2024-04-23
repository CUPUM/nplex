<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/location';
	import { FilePlus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Header from './Header.svelte';

	export let data;
</script>

<article>
	<Header {data} />
	<ul>
		<li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				{...$link(`/new/project`)}
				class="card button-parent"
				use:ripple
				in:fly|global={{ y: -6, easing: cubicOut, duration: 350 }}
			>
				<FilePlus class="button-icon" />
				<div class="button dashed rounded">
					<LangKey>{@html m.project_create()}</LangKey>
				</div>
			</a>
		</li>
		{#each data.matchProjects as project, i (project.id)}
			<li
				animate:flip={{ duration: (l) => 150 + l / 100 }}
				in:fly|global={{ y: -6, duration: 350, easing: expoOut, delay: i * 25, opacity: 0 }}
			>
				<a class="card" {...$link(`/edit/projects/${project.id}`)} use:ripple>
					{#if project.title}
						<span class="title">{project.title}</span>
					{:else}
						<span class="no-title"><LangKey>{m.project_untitled()}</LangKey></span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		grid-column: 1/-1;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - var(--navbar-height) - 2 * var(--base-gutter));
		min-height: calc(100svh - var(--navbar-height) - 2 * var(--base-gutter));
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;
		border-radius: var(--radius-lg);
		/* background: var(--dashboard-bg); */
		flex: 1;
		/* border: var(--base-border-width) solid var(--base-border-color); */
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
		justify-items: center;
		align-items: flex-start;
		flex-direction: row;
		gap: var(--base-gutter);
		flex-wrap: wrap;
	}

	li {
		position: relative;
		flex: none;
		width: 100%;
	}

	.card {
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		font-size: var(--size-xs);
		width: 100%;
		aspect-ratio: 3/4;
		padding: 2rem;
		background: var(--dashboard-bg);
		transition: all var(--duration-fast) ease-out;

		&:hover {
			background: white;

			:global(:--dark) & {
				background: color-mix(in srgb, var(--dashboard-bg) 100%, var(--color-neutral-100) 5%);
			}
		}

		.title {
			font-size: var(--size-lg);
		}

		.no-title {
			opacity: var(--opacity-muted);
			font-style: italic;
			font-weight: 300;
		}
	}
</style>
