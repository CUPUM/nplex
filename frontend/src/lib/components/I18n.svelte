<!--
	@component
	Internationalization helper component for local, non-database, i18n provision.
	This component also hosts the app's singleton store to reactively retrieve the client's locale.
	
-->
<script lang="ts" context="module">
	import { LOCALES, type Locale } from '$utils/enums';
	import { writable } from 'svelte/store';

	const defaultLocale = LOCALES.Fr; // To do in the future: get/set from cookie.

	export const locale = writable<Locale>(defaultLocale);
</script>

<script lang="ts">
	export let translations: T;

	type T = $$Generic<Record<Locale, L>>;

	$: translation = translations[$locale];
</script>

<slot {translation} />
