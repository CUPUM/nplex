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
		padding-bottom: 2rem;
	}
</style>
