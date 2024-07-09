<script lang="ts">
	import { ArrowRight, Search } from 'lucide-svelte';
</script>

<fieldset class="input-group text-md rounded-full">
	<Search />
	<input type="search" class="input" />
	<div class="input-peer">
		<button class="button aspect-square">
			<ArrowRight />
		</button>
	</div>
</fieldset>
