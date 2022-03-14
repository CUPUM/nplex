<script lang="ts">
	import { Properties } from 'maplibre-gl';
	import { setContext } from 'svelte';

	export let direction: 'horizontal' | 'vertical' = 'horizontal';

	setContext('group', {
		// set variant
		// etc...
	});
</script>

<div class={direction} {...$$restProps}>
	<slot />
</div>

<!-- Group buttons visually (remove spacing and round outer corners only) -->
<style lang="postcss">
	div {
		gap: 0;

		&.vertical {
			flex-direction: column;

			& :global {
				& > button,
				& > a {
					display: flex;
					margin: 0;

					&:first-child {
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0;
					}
					&:last-child {
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
					&:not(:first-child):not(:last-child) {
						border-radius: 0;
					}
				}
			}
		}

		&.horizontal {
			flex-direction: row;
			flex-wrap: nowrap;
			white-space: nowrap;

			& :global {
				& > button,
				& > a {
					display: inline-flex;
					border-radius: 0;
					margin: 0;

					&:first-child {
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0;
					}
					&:last-child {
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
					&:not(:first-child):not(:last-child) {
						border-radius: 0;
					}
				}
			}
		}
	}
</style>
