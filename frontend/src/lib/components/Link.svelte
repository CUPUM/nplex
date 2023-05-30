<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export let variant: 'default' | 'cta' | 'outlined' | 'footer' | 'ghost' = 'default';
	export let status: undefined | 'warning' = undefined;
	export let href: string;

	type $$Props = Omit<HTMLAnchorAttributes, 'class'> & {
		variant?: typeof variant;
		status?: typeof status;
		href: string;
	};
</script>

<a class="link" data-variant={variant} data-status={status} {href} {...$$restProps}>
	<slot />
</a>

<style lang="scss">
	// .link {
	// 	@mixin link-base {
	// 		border-radius: 1em;
	// 		padding-inline: 0.5em;
	// 		padding-block: 0.2em 0.4em;
	// 		box-decoration-break: clone;
	// 		color: var(--link-color);
	// 		background-color: var(--link-background);
	// 		box-shadow: 0 0 0 0em var(--link-background);
	// 		transition: all 0.2s var(--ui-ease-out);
	// 		&:hover {
	// 			color: var(--link-hover-color);
	// 			background-color: var(--link-hover-background);
	// 			box-shadow: 0 0 0 0.2em var(--link-hover-background);
	// 		}
	// 	}
	// 	--link-color: #{col(primary, 900)};
	// 	--link-background: #{col(primary, 100, 0.1)};
	// 	--link-hover-color: #{col(fg, 900)};
	// 	--link-hover-background: #{col(primary, 500, 0.2)};
	// 	@include link-base;

	// 	&-secondary {
	// 		--link-color: #{col(secondary, 900)};
	// 		--link-background: #{col(secondary, 500, 0.2)};
	// 		--link-hover-color: #{col(fg, 900)};
	// 		--link-hover-background: #{col(secondary, 500, 0.5)};
	// 		@include link-base;
	// 	}
	// }

	.link {
		border-radius: 1em;
		padding-inline: 0.35em;
		padding-block: 0.2em 0.4em;
		box-decoration-break: clone;
		color: var(--link-color);
		background-color: var(--link-background);
		box-shadow: 0 0 0 0em var(--link-background);
		transition: all 0.2s var(--ui-ease-out);
		&:hover {
			color: var(--link-hover-color);
			background-color: var(--link-hover-background);
			box-shadow: 0 0 0 0.2em var(--link-hover-background);
		}
	}

	[data-variant='default'] {
	}
</style>
