<script lang="ts">
	import { enhance } from '$app/forms';
	import { locales_arr, locales_details } from '$lib/i18n/locales';
</script>

<form method="POST" use:enhance action="/?/lang">
	{#each locales_arr as locale}
		<button name="locale" type="submit" value={locale}>{locales_details[locale].name}</button>
	{/each}
</form>

<style lang="scss">
</style>
