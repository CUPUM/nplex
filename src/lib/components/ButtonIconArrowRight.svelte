<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
</script>

<ArrowRight class="button-icon arrow-right" />

<style lang="postcss">
	:global(.button-icon.arrow-right) {
		translate: 0px;
		transition: all var(--duration-fast) ease-out;

		:global(.button:hover) & {
			translate: 0.25em;
		}
	}
</style>
