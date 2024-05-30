<script lang="ts">
	import { setLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';

	let { lang }: { lang: AvailableLanguageTag } = $props();

	const current = $derived(lang);
	setLanguageTag(() => current);
</script>
