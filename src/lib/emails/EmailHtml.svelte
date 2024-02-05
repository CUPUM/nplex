<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends Omit<HTMLAttributes<HTMLHtmlElement>, 'style'> {
		lang?: AvailableLanguageTag;
	}

	export let lang: $$Props['lang'] = undefined;
</script>

<html {...$$restProps} id="nplex-email" {lang}>
	<slot />
</html>
