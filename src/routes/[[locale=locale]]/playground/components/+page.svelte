<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { addErrorToast, addToast } from '$lib/components/ToastsOutlet.svelte';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { vstack } from 'styled-system/patterns';
	import { button, switchGroup } from 'styled-system/recipes';
	import { crossfade } from 'svelte/transition';

	let loading = true;

	function sendToast() {
		addToast({
			data: {
				title: toastTitle,
				description: toastDescription,
			},
		});
		addErrorToast({
			data: {
				title: toastTitle,
				description: toastDescription,
			},
		});
		if (resetToast) {
			toastTitle = '';
			toastDescription = '';
			toastBody = '';
		}
	}

	let resetToast = false;
	let toastTitle = '';
	let toastDescription = '';
	let toastBody = '';

	const outlined = button({ type: 'outlined' });

	const options = ['a', 'b', 'une autre option'];

	const [send, receive] = crossfade({});

	const {
		elements: { trigger, list },
		states: { value },
	} = createTabs({ defaultValue: options[0] });

	const {
		elements: { trigger: trigger2, list: list2 },
		states: { value: value2 },
	} = createTabs({ defaultValue: options[0] });
</script>

<!-- <section>
	<button
		class={outlined.root}
		on:pointerdown={() => {
			loading = !loading;
		}}
		data-loading={loading ?? undefined}
	>
		Show loading? ({loading})
		{#if loading}
			<Loading class={outlined.loading} />
		{/if}
	</button>
	{#if loading}
		<div>
			<Loading />
		</div>
	{/if}
</section>
<section class={vstack()}>
	<input type="text" class={input()} />
	<textarea placeholder="textarea" class={input()} />
	<fieldset class={inputGroup().root}>
		<input type="text" class={inputGroup().input} />
		<button class={button().root}>Hello</button>
	</fieldset>
</section> -->

<section class={vstack({ gap: '1rem', padding: '2rem' })}>
	<menu class={switchGroup().root} use:melt={$list}>
		{#each options as o}
			<button class={switchGroup().trigger} use:melt={$trigger(o)}>
				Option: {o}
				{#if o === $value}
					<div
						class={switchGroup().thumb}
						in:receive={{ key: 'thumb' }}
						out:send={{ key: 'thumb' }}
					></div>
				{/if}
			</button>
		{/each}
	</menu>
	<menu class={switchGroup().root} use:melt={$list2}>
		{#each options as o}
			<button class={switchGroup().trigger} use:melt={$trigger2(o)} use:ripple>
				Option: {o}
				{#if o === $value2}
					<div class={switchGroup().thumb} in:receive={{ key: '2' }} out:send={{ key: '2' }}></div>
				{/if}
			</button>
		{/each}
	</menu>
</section>
