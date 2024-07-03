<script lang="ts">
	import * as m from '$i18n/messages';

	let { data } = $props();
</script>

<article class="flex flex-1 flex-col items-center justify-center">
	<div class="prose prose-block bg-card p-card-padding rounded-card max-w-sm text-center">
		<h6>
			{m.map()}
		</h6>
		<p>{m.coming_soon()}</p>
	</div>
</article>
