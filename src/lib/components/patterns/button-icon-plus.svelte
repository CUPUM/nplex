<script lang="ts">
	import { Plus } from 'lucide-svelte';
</script>

<Plus class="button-icon plus" />

<style>
	:global(.button-icon.plus) {
		:global(.button:hover) & {
			animation: spin 1s infinite var(--ease-out-expo);
		}
	}

	@keyframes -global-spin {
		0% {
			rotate: 0deg;
		}
		20% {
			rotate: -20deg;
		}
		100% {
			rotate: 180deg;
		}
	}
</style>
