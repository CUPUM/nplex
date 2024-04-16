<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		lang,
		id,
		children,
		head,
		...restProps
	}: Omit<HTMLAttributes<HTMLHtmlElement>, 'style' | 'class'> & {
		children: Snippet;
		head?: Snippet;
	} = $props();
</script>

<html {...restProps} id={id ?? 'nplex-email'} {lang}>
	<head>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
		<link
			href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;550&display=swap"
			rel="stylesheet"
		/>
		{#if head}
			{@render head()}
		{/if}
	</head>
	<body>
		{@render children()}
	</body>
</html>
