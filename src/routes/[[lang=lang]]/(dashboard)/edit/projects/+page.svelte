<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { FilePlus, Search, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, constraints, errors, submitting } = superForm(data.filtersForm);

	let clearSearchParam = $derived.by(() => {
		const q = new URLSearchParams($page.url.searchParams);
		q.delete('search');
		return q.toString();
	});
</script>

<article>
	<header>
		<hgroup>
			<h1 class="h2">
				{m.projects_edit()}
			</h1>
		</hgroup>
		<form
			method="GET"
			data-sveltekit-keepfocus
			data-sveltekit-replacestate
			data-sveltekit-noscroll
			class="input-group"
			in:fly|global={{ y: 6, easing: cubicOut, duration: 450 }}
		>
			<input
				type="search"
				placeholder={m.project_find()}
				name="search"
				class="input"
				bind:value={$form.search}
			/>
			<div class="input-peer">
				{#if $form.search}
					<a
						transition:scale={{ duration: 250, start: 0.5, opacity: 0, easing: expoOut }}
						href="?{clearSearchParam}"
						data-sveltekit-replacestate
						data-sveltekit-noscroll
						class="button button-ghost aspect-square"
					>
						<X />
					</a>
				{/if}
				<button class="button button-cta aspect-square" type="submit">
					<Search class="button-icon" />
				</button>
			</div>
		</form>
	</header>
	<ul>
		<li>
			<a
				{...linkAttributes(`/create/project`)}
				rel="external"
				use:ripple
				in:fly|global={{ y: -6, easing: cubicOut, duration: 350 }}
				class="button button-dashed"
			>
				<FilePlus />
				{m.project_create_new()}
			</a>
		</li>
		{#each data.results as project, i (project.id)}
			<li
				animate:flip={{ duration: (l) => 150 + l / 100 }}
				in:fly|global={{ y: -6, duration: 350, easing: expoOut, delay: i * 25, opacity: 0 }}
			>
				<a
					{...linkAttributes(`/edit/projects/${project.id}`)}
					use:ripple
					class="p-card-padding bg-card rounded-card relative flex cursor-pointer"
				>
					{project.id}
					<!-- {#if project.title}
						<span>{project.title}</span>
					{:else}
						<span>{m.project_untitled()}</span>
					{/if} -->
				</a>
			</li>
		{/each}
	</ul>
</article>
