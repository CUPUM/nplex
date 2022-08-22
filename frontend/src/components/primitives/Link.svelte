<script lang="ts">
	import type { SizeInput } from '$utils/css';

	export let href: string;
	export let size: SizeInput = '1em';
	export let variant: 'default' | 'cta' | 'footer' | 'secondary' | 'ghost' = 'default';
	export let disabled: boolean = undefined;
</script>

<a {href} {...$$restProps} style:text-size={size} {...$$restProps} class={variant} class:disabled>
	<div class="content">
		<slot />
	</div>
	<div class="content-fx">
		<slot />
	</div>
</a>

<style lang="scss">
	a {
		&.disabled {
		}
	}

	.content {
	}

	.content-fx {
	}
</style>
