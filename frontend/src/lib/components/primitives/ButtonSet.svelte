<!--
	@component
	Hello world.
 -->
<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { setContext } from 'svelte';

	export let direction: 'horizontal' | 'vertical' = 'vertical';

	setContext(Ctx.ButtonSet, true);
</script>

<div class={direction} {...$$restProps}>
	<slot />
</div>

<!-- Group buttons visually (remove spacing and round outer corners only) -->
<style lang="scss">
	div {
		gap: 0;

		&.vertical {
			flex-direction: column;
			align-items: stretch;

			& :global {
				& > button,
				& > a {
					display: flex;
					width: 100%;
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
