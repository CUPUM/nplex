<svelte:options css="injected" />

<script lang="ts">
	import { languageTag, type AvailableLanguageTag } from '$i18n/runtime';
	import type { Snippet } from 'svelte';

	let {
		lang = languageTag(),
		children,
	}: {
		children: Snippet;
		lang?: AvailableLanguageTag;
	} = $props();
</script>

<html {lang}>
	<head>
		<title></title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
		<link
			href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
			rel="stylesheet"
		/>
		{@html '%svelte-email.head%'}
	</head>
	<body style="font-family:'Plus Jarkarta Sans',sans-serif;padding:2rem">
		{@render children()}
	</body>
</html>
