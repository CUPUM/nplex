<script>
	import Button from '$components/primitives/Button.svelte';
	import { getSegments } from '$utils/url';

	function submit() {
		console.log('test');
	}
</script>

<h2>Index</h2>
<form on:submit|preventDefault={submit}>
	<Button>Test</Button>
</form>

