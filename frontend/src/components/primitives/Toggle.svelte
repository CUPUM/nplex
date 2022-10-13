<script lang="ts" context="module">
</script>

<script lang="ts">
	export let id: string = undefined;
	export let name: string = undefined;
	export let toggled: boolean;
	export let labelOff: string = '';
	export let labelOn: string = '';
	export let disabled: boolean = undefined;
	let className: string = undefined;
	export { className as class };
</script>

<label class="toggle {className}" class:disabled class:toggled for={id}>
	<div class="inner">
		<div class="label off">
			<span class="label-content">
				<slot name="off">
					{labelOff}
				</slot>
			</span>
		</div>
		<div class="label on">
			<span class="label-content">
				<slot name="on">
					{labelOn}
				</slot>
			</span>
		</div>
		<div class="thumb" />
	</div>
	<input type="checkbox" {name} {id} hidden bind:checked={toggled} on:input />
</label>

<style lang="scss">
	.toggle {
		display: inline-block;
		background-color: rgba(var(--rgb-light-700), 0.9);
		border-radius: 2em;
		margin: 0;
		cursor: pointer;
		border: 1px solid var(--color-light-900);
		padding: 5px;
		transition: all 0.15s ease-in-out;
		&:hover {
			background-color: rgba(var(--rgb-light-900), 1);
		}

		&.toggled {
			background-color: rgba(var(--rgb-primary-500), 0.9);
			border: 1px solid var(--color-primary-500);
			&:hover {
				background-color: rgba(var(--rgb-primary-300), 1);
			}
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	.inner {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		user-select: none;
		height: 2em;
	}

	.label {
		position: relative;
		display: flex;
		min-width: 2em;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5em;
		top: -0.1em;
		transition: opacity 0.15s;
	}

	.on {
		opacity: 1;
	}
	.off {
		opacity: 0;
	}

	.toggled {
		.on {
			opacity: 0;
		}
		.off {
			opacity: 1;
		}
	}

	.label-content {
		position: relative;
		display: inline-block;
	}

	.thumb {
		position: absolute;
		height: 100%;
		aspect-ratio: 1 / 1;
		background-color: var(--color-light-100);
		border-radius: 50%;
		left: 0;
		transition: all 0.15s cubic-bezier(0.25, 0, 0.7, 1.5);

		.toggled & {
			left: 100%;
			transform: translateX(-100%);
		}
	}
</style>
