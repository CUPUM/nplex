<script lang="ts">
	import Description from './description.svelte';
	import Gallery from './gallery.svelte';
	import Header from './header.svelte';
	import Markers from './markers.svelte';

	let { data } = $props();
</script>

<Header {data} />
<Description {data} />
<Gallery {data} />
<Markers {data} />
