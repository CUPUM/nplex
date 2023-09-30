<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { addErrorToast, addToast } from '$lib/components/ToastsOutlet.svelte';

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
</script>

<section>
	<button
		class="button"
		on:pointerdown={() => {
			loading = !loading;
		}}
	>
		Show loading? ({loading})
	</button>
	{#if loading}
		<div>
			<Loading />
		</div>
	{/if}
</section>
<section>
	<label class="labeled-input">
		<span class="label">Toast title</span>
		<input type="text" class="input" bind:value={toastTitle} />
	</label>
	<label class="labeled-input">
		<span class="label">Toast description</span>
		<input type="text" class="input" bind:value={toastDescription} />
	</label>
	<label class="labeled-input">
		<span class="label">Toast content</span>
		<input type="text" class="input" bind:value={toastBody} />
	</label>
	<label>
		Reset on submit
		<input type="checkbox" bind:checked={resetToast} />
	</label>
	<button class="button" on:click={sendToast}>Send toast</button>
</section>

<style lang="scss">
	section {
		margin-top: 10rem;
		align-self: center;
		font-size: var(--size-sm);
	}

	button {
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.2);
	}
	div {
		width: 100px;
		height: 100px;
		position: relative;
		font-size: var(--size-2xl);
	}
</style>
