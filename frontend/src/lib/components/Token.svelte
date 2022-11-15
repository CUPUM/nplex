<!--
	@component
	## Token
	Token

 -->
<script lang="ts">
	export let variant: 'default' | 'outlined' | 'ghost' | 'cta' | 'danger' = 'default';
	export let disabled: boolean | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let warning: boolean = false;
	export let active: boolean = false;
	export let value: any = undefined;
	export let name: string | undefined = undefined;
	export let as: string | undefined = undefined;
	export let style: string | undefined = undefined;
	let class_: string = '';
	export { class_ as class };
</script>

<svelte:element
	this={as ? as : value ? 'label' : 'div'}
	class="token nest {variant}"
	class:active
	class:warning
	{disabled}
	on:click
	on:focus
	on:blur
	on:keypress
	on:mouseover
	on:mouseenter
	on:mouseleave
>
	<div class="label">
		<slot />
	</div>
	{#if $$slots.input}
		<div class="input">
			<slot name="input" />
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	:where(.token) {
		--height: var(--ui-height);
		display: flex;
		flex: none;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border: none;
		padding: 0;
		margin: 0;
	}

	.default {
	}
</style>
