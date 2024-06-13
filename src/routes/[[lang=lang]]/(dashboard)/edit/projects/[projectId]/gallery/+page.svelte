<script lang="ts">
	import { extendSuperForm } from '$lib/crud/form/client';
	import { flip } from 'svelte/animate';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import ProjectImage from './project-image.svelte';
	import ProjectNewImage from './project-new-image.svelte';

	let { data } = $props();

	const projectForm = extendSuperForm(
		superForm(data.form, { dataType: 'json', invalidateAll: 'force' })
	);
</script>

<ProjectNewImage {...data} />
<ul>
	{#each data.imagesForms as imageForm, i (imageForm.id)}
		<li
			animate:flip={{ duration: 250, easing: expoInOut }}
			in:fly={{ y: 6, easing: expoOut }}
			out:scale={{ duration: 50, start: 0.95 }}
		>
			<ProjectImage {imageForm} {...projectForm} />
		</li>
	{/each}
</ul>
