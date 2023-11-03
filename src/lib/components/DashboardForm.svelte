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
			<slot name="header" />
		</header>
	{/if}
	<div class="content">
		<slot />
	</div>
</form>

<style lang="postcss">
	form {
		background-color: var(--dashboard-base-bg);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--base-gutter);
	}

	header {
		padding: 3rem;
		border-bottom: var(--base-border);
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* padding: 1rem; */
		container-type: inline-size;
		gap: 0;
		padding-bottom: 2rem;
	}
</style>
