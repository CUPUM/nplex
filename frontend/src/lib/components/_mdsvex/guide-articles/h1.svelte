<script lang="ts" context="module">
</script>

<script lang="ts">
	import { reveal } from '$actions/reveal';
	import { slipMask } from '$utils/presets/reveal';
</script>

<h1 use:reveal={slipMask}><slot /></h1>

<style lang="scss">
	h1 {
		// color: royalblue;
	}
</style>
