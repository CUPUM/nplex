<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<ArrowLeft class="button-icon arrow-right" />

<style lang="postcss">
	:global(.button-icon.arrow-right) {
		translate: 0px;
		transition: all var(--duration-fast) ease-out;

		:global(.button:hover) & {
			translate: -0.25em;
		}
	}
</style>
