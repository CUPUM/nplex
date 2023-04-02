<!--
	@component
	# Render Markdown
	Renders the given source string as html from parsing it as markdown.
	
-->

<script lang="ts" context="module">
</script>

<script lang="ts">
	import { marked } from 'marked';

	export let source: string | undefined | null;
	export let parser: typeof marked.parse | typeof marked.parseInline = marked.parse;
	let rendered: string;

	$: if (source) {
		rendered = parser(source.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''));
	}
	// export let renderer: marked // isInline ?
</script>

{@html rendered}

<style lang="scss">
</style>
