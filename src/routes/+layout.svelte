<!--
	This layout is necessary for global styles to apply to the catchall error page.
-->
<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
