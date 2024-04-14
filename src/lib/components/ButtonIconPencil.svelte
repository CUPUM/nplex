<script lang="ts">
	import { Pencil } from 'lucide-svelte';
</script>

<Pencil class="button-icon pencil" />

<style>
	:global(.button-icon.pencil) {
		:global(.button:hover) & {
			animation: wiggle 1s ease-out;
		}
	}

	@keyframes -global-wiggle {
		0% {
			rotate: 0deg;
		}
		10% {
			rotate: 25deg;
		}
		25% {
			rotate: -15deg;
		}
		50% {
			rotate: 5deg;
		}
		100% {
			rotate: 0deg;
		}
	}
</style>
