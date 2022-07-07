<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import { messages } from '$stores/messages';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

<div class="outlet">
	{#each $messages as message (message)}
		<dialog
			in:scale|local={{ start: 0.75, opacity: 0, duration: 500, easing: expoOut }}
			out:scale|local={{ start: 0.9, opacity: 0, duration: 350, easing: expoOut }}
			animate:flip={{ duration: 350, easing: expoOut }}
			class={message.type}
		>
			<div class="progress-container">
				<div class="progress" style:--timer="{message.timer}ms" />
			</div>
			<div class="content">
				{@html message.text}
			</div>
			<Button
				style="position: absolute; left: calc(100% + .5em);"
				warning={message.type === 'error'}
				on:click={() => messages.clear(message)}><Icon slot="icon" name="cross" /></Button
			>
		</dialog>
	{/each}
</div>

<style lang="scss">
	.outlet {
		pointer-events: none;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		z-index: 1000;
	}

	dialog {
		--inset: var(--default-inset);
		font-size: var(--size-medium);
		pointer-events: all;
		position: relative;
		max-width: 60ch;
		height: auto;
		flex: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: var(--inset);
		border: none;
		border-radius: var(--default-radius);
		box-shadow: 0 1.5em 4em -1em rgba(var(--rgb-dark-900), 0.25);
	}

	.content {
		position: relative;
		padding: 1.25em 1.5em;
	}

	.progress-container {
		flex: none;
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		left: 0;
		top: 0;
		width: 100%;
		padding: 0 1.5em;
	}

	.progress {
		width: 100%;
		height: 3px;
		border-radius: 0 0 3px 3px;
		animation: timer forwards var(--timer) linear;
	}

	.default {
		background-color: white;

		& .progress {
			background-color: var(--color-primary-300);
		}
	}

	.error {
		background-color: var(--color-error-300);
		color: var(--color-light-100);

		& .progress {
			background-color: var(--color-error-900);
		}
	}

	@keyframes timer {
		0% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}
</style>
