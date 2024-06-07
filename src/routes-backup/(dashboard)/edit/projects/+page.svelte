<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
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
				use:ripple
				in:fly|global={{ y: -6, easing: cubicOut, duration: 350 }}
			>
				<FilePlus />
				<div>
					{@html m.project_create()}
				</div>
			</a>
		</li>
		{#each data.matchProjects as project, i (project.id)}
			<li
				animate:flip={{ duration: (l) => 150 + l / 100 }}
				in:fly|global={{ y: -6, duration: 350, easing: expoOut, delay: i * 25, opacity: 0 }}
			>
				<a {...$link(`/edit/projects/${project.id}`)} use:ripple>
					{#if project.title}
						<span>{project.title}</span>
					{:else}
						<span>{m.project_untitled()}</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</article>
