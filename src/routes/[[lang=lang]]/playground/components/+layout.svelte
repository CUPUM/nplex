<script lang="ts">
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { SIZE_MODS, options } from './states.svelte';

	let { data, children } = $props();

	const components: { subRoute: string; name: string }[] = [
		{ subRoute: 'button', name: 'Button' },
		{ subRoute: 'input', name: 'Input' },
		{ subRoute: 'toggle', name: 'Toggle' },
		{ subRoute: 'switch', name: 'Switch' },
		{ subRoute: 'slider', name: 'Slider' },
		{ subRoute: 'dialog', name: 'Dialog' },
		{ subRoute: 'toast', name: 'Toast' },
	];
</script>

<div class="flex grow-1 flex-row">
	<section
		class="gap-gutter p-gutter top-sticky-top w-sidebar-width sticky flex flex-col self-start text-sm"
	>
		<nav class="flex flex-col">
			{#each components as c}
				<a
					{...linkAttributes(`/playground/components/${c.subRoute}`)}
					class="button button-nav font-bold"
					use:ripple
				>
					{c.name}
				</a>
			{/each}
		</nav>
		<menu class="flex flex-col">
			<fieldset class="p-sm bg-card flex flex-col rounded-md">
				{#each Object.entries(SIZE_MODS) as [key, value]}
					<label
						class="gap-menu-gutter py-xs px-sm has-checked:bg-base flex cursor-pointer flex-row rounded-full has-checked:font-bold"
					>
						<input type="radio" {value} bind:group={options.sizeMod} />
						{key}
					</label>
				{/each}
			</fieldset>
		</menu>
	</section>
	<article class="p-lg bg-card min-w-0 flex-1 rounded-tl-lg rounded-bl-lg">
		{@render children()}
	</article>
</div>
