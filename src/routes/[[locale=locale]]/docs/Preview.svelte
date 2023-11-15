<!--
	@see https://github.com/mattjennings/mdsvexamples
	@see https://github.com/PrismJS/prism-themes
-->
<script lang="ts" context="module">
	let copied = writable<unknown>();
</script>

<script lang="ts">
	import { addSuccessToast } from '$lib/components/ToastsOutlet.svelte';

	import { MODES } from '$lib/modes/constants';
	import { Check, Copy } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	// the source of the example, if you want it
	export let src: string;
	// all meta tags of the code block
	export let meta;

	const key = {};
	let timeout: unknown;

	function copy() {
		timeout = undefined;
		copied.set(key);
		navigator.clipboard.writeText(src);
		addSuccessToast({
			data: {
				title: 'Copied',
				description: 'Code block copied successfully!',
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
		}, 5000);
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
					<Check class="button-icon" />
				{:else}
					<Copy class="button-icon" />
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
		margin-block: 0.5rem;
		background-color: var(--base-bg);
		border: var(--base-border-size) solid
			color-mix(in srgb, var(--base-border-color) 50%, transparent);
		.code {
			--base-radius: var(--_base-radius);
		}
	}

	.example {
		position: relative;
		padding: 1rem;
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
			font-size: var(--size-xs);
			position: absolute;
			top: var(--base-nesting);
			right: var(--base-nesting);
			transition: all var(--duration-fast) ease-out;
		}
	}

	:global(code[class*='language-']),
	:global(pre[class*='language-']) {
		color: #f8f8f2;
		background: none;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}

	/* Code blocks */
	:global(pre[class*='language-']) {
		padding: 1rem;
		/* margin: 0.5em 0; */
		overflow: auto;
		border-radius: var(--base-radius);
	}

	:global(:not(pre) > code[class*='language-']),
	pre[class*='language-'] {
		background: var(--color-neutral-700);
	}

	/* Inline code */
	:global(:not(pre) > code[class*='language-']) {
		padding: 0.1em;
		border-radius: var(--base-radius);
		white-space: normal;
	}

	code {
		:global(.token.comment),
		:global(.token.prolog),
		:global(.token.doctype),
		:global(.token.cdata) {
			color: #636f88;
		}

		:global(.token.punctuation) {
			color: #81a1c1;
		}

		:global(.namespace) {
			opacity: 0.7;
		}

		:global(.token.property),
		:global(.token.tag),
		:global(.token.constant),
		:global(.token.symbol),
		:global(.token.deleted) {
			color: #81a1c1;
		}

		:global(.token.number) {
			color: #b48ead;
		}

		:global(.token.boolean) {
			color: #81a1c1;
		}

		:global(.token.selector),
		:global(.token.attr-name),
		:global(.token.string),
		:global(.token.char),
		:global(.token.builtin),
		:global(.token.inserted) {
			color: #a3be8c;
		}

		:global(.token.operator),
		:global(.token.entity),
		:global(.token.url),
		:global(.language-css .token.string),
		:global(.style .token.string),
		:global(.token.variable) {
			color: #81a1c1;
		}

		:global(.token.atrule),
		:global(.token.attr-value),
		:global(.token.function),
		:global(.token.class-name) {
			color: #88c0d0;
		}

		:global(.token.keyword) {
			color: #81a1c1;
		}

		:global(.token.regex),
		:global(.token.important) {
			color: #ebcb8b;
		}

		:global(.token.important),
		:global(.token.bold) {
			font-weight: bold;
		}

		:global(.token.italic) {
			font-style: italic;
		}

		:global(.token.entity) {
			cursor: help;
		}
	}
</style>
