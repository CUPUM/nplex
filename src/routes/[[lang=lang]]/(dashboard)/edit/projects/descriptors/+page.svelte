<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<section class="dashboard-section prose">
	<h1 class="h2">
		<LangKey>{m.project_descriptors()}</LangKey>
	</h1>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic libero laudantium veniam fuga
		neque voluptates consectetur perferendis nisi cupiditate porro!
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero totam provident necessitatibus
		neque vero? Distinctio consectetur neque voluptates ratione fuga, eius veniam vero rerum
		architecto nulla itaque dolorum optio esse!
	</p>
</section>

<style>
	@import '$styles/scoped/dashboard';

	.prose {
		display: block;
		padding: 2rem;
		padding-top: 0;
	}
</style>
