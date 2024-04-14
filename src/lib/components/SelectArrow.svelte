<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	export let open: boolean;
</script>

<ChevronDown class="input-icon" style="transform: rotate({open ? 180 : 0}deg)" />

<style>
</style>
