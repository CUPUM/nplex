<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { FilePlus, Search, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	export let data;
</script>

<article>
	<header>
		<h1 class="h2">
			<LangKey>{m.project_edit()}</LangKey>
		</h1>
	</header>
	<section>
		<form
			method="GET"
			data-sveltekit-keepfocu
			data-sveltekit-replacestate
			data-sveltekit-noscroll
			class="input-group bg-blur"
			in:fly|global={{ y: 6, easing: cubicOut, duration: 450 }}
		>
			<input
				type="search"
				name="search"
				placeholder={$langKey(m.project_find())}
				class="input"
				value={data.search}
			/>
			<div class="input-peer">
				{#if $page.url.searchParams.get('search')}
					<a
						transition:scale={{ duration: 250, start: 0.5, opacity: 0, easing: expoOut }}
						{...$link('/edit/projects')}
						class="button ghost square"
					>
						<X />
					</a>
				{/if}
				<button class="button cta square" type="submit">
					<Search class="button-icon" />
				</button>
			</div>
		</form>
		<ul>
			<li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					{...$link(`/new/project`)}
					class="card"
					use:ripple
					in:fly|global={{ y: -6, easing: cubicOut, duration: 350 }}
				>
					<div class="button cta rounded">
						<LangKey>{@html m.project_create()}</LangKey>
						<FilePlus class="button-icon" />
					</div>
				</a>
			</li>
			{#each data.searchProjects as project, i (project.id)}
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
	</section>
</article>

<style lang="postcss">
	article {
		grid-column: 1/-1;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - var(--navbar-height) - 2 * var(--base-gutter));
		min-height: calc(100svh - var(--navbar-height) - 2 * var(--base-gutter));
	}

	form {
		/* --input-radius: var(--radius-sm); */
		position: sticky;
		top: var(--sticky-top);
		z-index: 1;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;
		border-radius: var(--radius-lg);
		background: var(--dashboard-bg);
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
		align-items: center;
		justify-content: center;
		font-size: var(--size-xs);
		width: 100%;
		aspect-ratio: 3/4;
		padding: 2rem;
		background: var(--color-neutral-200);

		:global(:--dark) & {
			background: var(--color-neutral-900);
		}

		.title {
			font-size: var(--size-lg);
		}

		.no-title {
			opacity: var(--opacity-dimmer);
			font-style: italic;
			font-weight: 300;
		}
	}

	header {
		padding: 2rem;
	}

	#projects-actions {
		grid-column: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--base-gutter);
		/* border: var(--base-border-width) dashed var(--base-border-color); */
		border-radius: var(--radius-md);
		padding: 2rem;
	}

	#projects-search {
		grid-column: 2;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
</style>
