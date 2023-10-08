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
	<slot currentAction={$input?.action} element={$element} {loading} />
</form>

<style lang="postcss">
	form {
		padding: 1rem;
	}

	header {
	}
</style>
