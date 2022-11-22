<script lang="ts">
	export let href: string;
	export let variant: 'default' | 'cta' | 'footer' | 'ghost' = 'default';
	export let disabled: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	export let rel: 'external' | undefined = undefined;
</script>

<a
	{href}
	{rel}
	class="link {variant} {className}"
	class:disabled
	{disabled}
	{style}
	on:click
	on:focus
	on:blur
	on:mouseover
	on:mousemove
>
	<div class="content reg">
		<slot />
	</div>
	<div class="content fx">
		<slot />
	</div>
</a>

<style lang="scss">
	.link {
		position: relative;
		display: inline-block;
		font-family: inherit;
		padding: 0;
		margin: 0;
		border-radius: 2em;
		overflow: hidden;
		transition: all 0.2s ease-out;
		font-weight: inherit;

		&:hover {
			color: col(primary, 700);
			background: col(primary, 300, 0.2);

			.reg {
				opacity: 0;
				transform: rotate(-15deg);
			}

			.fx {
				opacity: 1;
				transform: rotate(0deg);
			}
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.5;
			transform: scale(0.99);
		}
	}

	.content {
		padding: 0.4em 1em 0.6em 1em;
		transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1),
			opacity 0.5s cubic-bezier(0.2, 0, 0, 1);
	}

	.reg {
		opacity: 1;
		transform: rotate(0deg);
		transform-origin: -5em center;
	}

	.fx {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
		transform: rotate(-15deg);
		transform-origin: calc(100% + 5em) center;
	}
</style>
