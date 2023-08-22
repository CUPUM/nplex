<script lang="ts">
	export let data;
</script>

<header>Header / navbar</header>
<main>
	<p>{data.locale}</p>
	<slot />
</main>
<footer>Footer</footer>

<style lang="scss">
</style>
