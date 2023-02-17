<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
</script>

<RootBackground body={col('bg', '700')} />
<slot />

<style lang="scss">
</style>
