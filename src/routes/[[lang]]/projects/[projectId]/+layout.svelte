<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { Pencil } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { children, data } = $props();
</script>

{@render children()}
<menu
	class="bottom-padding sticky mx-auto text-xs"
	in:fly|global={{ y: 6, duration: 750, easing: expoOut }}
>
	{#if data.canEditProject}
		<a href="/edit/projects/{$page.params.projectId}" class="button button-cta rounded-full">
			<Pencil />{m.edit()}
		</a>
	{/if}
</menu>
