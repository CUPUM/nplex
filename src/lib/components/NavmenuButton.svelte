<script lang="ts">
	import type { Locale } from '$lib/i18n/constants';

	type $$Generic =
		| {
				href: string;
				hreflang: Locale;
		  }
		| {};
</script>

<!-- Template -->
<!-- End template -->

<style lang="scss">
	.button {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: var(--space-3xs);
		align-items: center;
		justify-content: flex-start;
		height: var(--space-2xl);
		font-size: var(--size-sm);
		font-weight: 450;
		letter-spacing: 0.02em;
		padding-inline: var(--size-lg);
		border-radius: var(--radius-sm);
		outline: 1px solid transparent;
		outline-offset: 4px;
		transition:
			all 0.1s ease-out,
			outline 0.25s ease-out,
			outline-offset 0.25s ease-out;

		&:hover {
			background-color: color-mix(in hsl, var(--color-primary-500) 20%, transparent);
		}

		&:focus-visible {
			z-index: 1;
			outline: 3px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
			outline-offset: 0;
		}

		&[data-state='open'] {
			z-index: 1;
		}
	}
</style>
