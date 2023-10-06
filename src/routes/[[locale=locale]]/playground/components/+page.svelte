<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { addErrorToast, addToast } from '$lib/components/ToastsOutlet.svelte';
	import { vstack } from 'styled-system/patterns';
	import { button, input, inputGroup } from 'styled-system/recipes';

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
</script>

<section>
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
</section>

<style lang="scss">
	section {
		margin-top: 10rem;
		align-self: center;
		font-size: var(--size-sm);
	}

	div {
		width: 100px;
		height: 100px;
		position: relative;
		font-size: var(--size-2xl);
	}
</style>
