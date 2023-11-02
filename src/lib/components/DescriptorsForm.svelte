<script lang="ts" context="module">
	type V = ZodValidation<AnyZodObject>;
</script>

<script lang="ts" generics="T extends V">
	import type { SuperForm } from '$lib/forms/super-form';

	import type { ZodValidation } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';

	export let action: string | undefined = undefined;
	export let enhance: SuperForm<T>['enhance'];
	export let method: string = 'POST';
	export let id: string | undefined = undefined;
</script>

<form {action} use:enhance {method} {id}>
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}
	<slot />
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
