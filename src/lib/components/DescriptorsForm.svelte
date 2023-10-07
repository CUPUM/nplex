<script lang="ts" context="module">
	type V = ZodValidation<AnyZodObject>;
</script>

<script lang="ts" generics="T extends V">
	import { createFormActionLoading } from '$lib/actions/loading';

	import type { ZodValidation } from 'sveltekit-superforms';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';

	export let action: string | undefined = undefined;
	export let enhance: SuperForm<T>['enhance'];
	export let method: string = 'POST';

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
	<slot currentAction={$input?.action} element={$element} {loading} />
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		container-type: inline-size;
		padding-bottom: 2rem;
	}

	header {
		padding: 1rem 2rem;
		padding-top: 0;
	}
</style>
