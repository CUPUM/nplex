<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { FilePlus, Search } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	export let data;
</script>

<form method="GET" data-sveltekit-keepfocus data-sveltekit-replacestate data-sveltekit-noscroll>
	<section id="projects-actions">
		<!-- <header>
			<h1 class="h2">
				<LangKey>{m.project_edit()}</LangKey>
			</h1>
		</header> -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			{...$link(`/new/project`)}
			class="button cta"
			in:fly|global={{ y: 8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			<LangKey>{@html m.project_create()}</LangKey>
			<FilePlus class="button-icon" />
		</a>
		<span class="dim" in:fade|global={{ delay: 500, duration: 1000 }}>
			<LangKey>{m.or()}</LangKey>
		</span>
		<fieldset
			class="input-group bg-blur"
			in:fly|global={{ y: -8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			<input type="search" name="search" placeholder={$langKey(m.project_find())} class="input" />
			<div class="input-peer">
				<button class="button cta square" type="submit">
					<Search class="button-icon" />
				</button>
			</div>
		</fieldset>
	</section>
	<ul>
		<!-- {#each data.filteredProjects as project}
			<li>
				<a {...$link(`/edit/projects/${project.id}`)}>
					{project.title}
				</a>
			</li>
		{/each} -->
	</ul>
</form>

<style lang="postcss">
	form {
		grid-column: 1/-1;
		position: relative;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: calc(100vh - var(--navbar-height) - 2 * var(--base-gutter));
		min-height: calc(100svh - var(--navbar-height) - 2 * var(--base-gutter));
	}

	.dim {
		font-size: var(--size-sm);
		opacity: var(--opacity-dim);
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
