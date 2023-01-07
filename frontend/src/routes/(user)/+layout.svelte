<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
</script>

<RootBackground color={col('bg', '500')} />
<slot />

<style lang="scss">
</style>
