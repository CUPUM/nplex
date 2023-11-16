<!--
	@see https://github.com/mattjennings/mdsvexamples
	@see https://github.com/PrismJS/prism-themes
-->
<script lang="ts" context="module">
	let copied = writable<unknown>();
</script>

<script lang="ts">
	import { addToast } from '$lib/components/ToastsOutlet.svelte';

	import { MODES } from '$lib/modes/constants';
	import { Check, Copy } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	// the source of the example, if you want it
	export let src: string;
	// all meta tags of the code block
	export let meta;

	const key = {};
	let timeout: unknown;

	function copy() {
		if (timeout) {
			clearTimeout(timeout as any);
			timeout = undefined;
		}
		copied.set(key);
		navigator.clipboard.writeText(src);
		addToast({
			closeDelay: 2500,
			data: {
				title: 'Copied to clipboard',
				description: 'The code block is now copied in your clipboard!',
			},
		});
		timeout = setTimeout(() => {
			timeout = undefined;
			copied.update((v) => {
				if (v === key) {
					return undefined;
				}
				return v;
			});
		}, 1000);
	}
</script>

<div class="preview">
	<div class="example">
		<slot name="example" />
	</div>
	<code class="code" data-mode={MODES.DARK}>
		<menu>
			<button class="button ghost square" on:click={copy}>
				{#if $copied === key}
					<div
						transition:scale={{ start: 0.25, duration: 350, easing: expoOut }}
						style="position: absolute;"
					>
						<Check class="button-icon" />
					</div>
				{:else}
					<div
						transition:scale={{ start: 0.25, duration: 350, easing: expoOut }}
						style="position: absolute;"
					>
						<Copy class="button-icon" />
					</div>
				{/if}
			</button>
		</menu>
		<pre class="language-svelte"><slot name="code" /></pre>
	</code>
</div>

<style lang="postcss">
	.preview {
		--_base-radius: calc(var(--base-radius) - var(--base-nesting));
		position: relative;
		border-radius: var(--base-radius);
		padding: var(--base-nesting);
		margin-block: 2.666em;
		background-color: var(--base-bg);
		border: var(--base-border-width) solid
			color-mix(in srgb, var(--base-border-color) 50%, transparent);
		.code {
			--base-radius: var(--_base-radius);
		}
	}

	.example {
		position: relative;
		padding: 2rem;
	}

	.code {
		position: relative;

		&:hover {
			menu {
				opacity: 1;
			}
		}

		menu {
			opacity: 0.25;
			font-size: var(--size-sm);
			position: absolute;
			top: var(--base-nesting);
			right: var(--base-nesting);
			transition: all var(--duration-fast) ease-out;
		}
	}
</style>
