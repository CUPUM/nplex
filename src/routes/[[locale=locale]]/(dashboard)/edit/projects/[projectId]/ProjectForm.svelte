<script lang="ts">
	import { createFormActionLoading } from '$lib/actions/loading';
	import type { ZodValidation } from 'sveltekit-superforms';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';

	type T = $$Generic<ZodValidation<AnyZodObject>>;

	export let enhance: SuperForm<T>['enhance'];
	export let action: string | undefined = undefined;
	export let method = 'POST';
	const {
		state: { input },
		element,
		action: { loading },
	} = createFormActionLoading();
</script>

<form
	{action}
	use:enhance={{
		onSubmit(ipt) {
			input.set(ipt);
		},
		onResult(event) {
			input.set(null);
		},
	}}
	{method}
>
	{#if $$slots.header}
		<header>
			<slot name="header" currentAction={$input?.action} />
		</header>
	{/if}
	<div class="content">
		<slot currentAction={$input?.action} element={$element} {loading} />
	</div>
</form>

<style lang="postcss">
	form {
		border-radius: inherit;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	header {
		padding: 3rem;
		padding-top: 1rem;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: inherit;
		:global(:--dark) & {
			background-color: color-mix(in srgb, var(--color-neutral-950) 20%, transparent);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* padding: 1rem; */
		container-type: inline-size;
		gap: 0;
	}
</style>
