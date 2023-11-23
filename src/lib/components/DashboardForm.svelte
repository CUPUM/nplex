<script lang="ts">
	import type { SuperForm } from '$lib/forms/super-form';
	import type { ZodValidation } from 'sveltekit-superforms';
	import type { AnyZodObject } from 'zod';

	type T = $$Generic<ZodValidation<AnyZodObject>>;

	export let enhance: SuperForm<T>['enhance'];
	export let action: string | undefined = undefined;
	export let method = 'POST';
</script>

<form {action} use:enhance {method}>
	{#if $$slots.header}
		<header>
			<hgroup class="prose">
				<slot name="header" />
			</hgroup>
		</header>
	{/if}
	<slot />
</form>

<style lang="postcss">
	form {
		grid-column: 1 / -1;
		display: inherit;
		grid-template-columns: inherit;
		gap: inherit;
		border-radius: inherit;
		background-color: var(--dashboard-bg);
	}

	header {
		grid-column: 1 / -1;
		padding: 3rem;
		padding-top: 0;
		border-bottom: var(--base-border-width) solid
			color-mix(in srgb, var(--base-border-color) 50%, transparent);
	}
</style>
