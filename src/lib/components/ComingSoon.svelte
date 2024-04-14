<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from './LangKey.svelte';
</script>

<article>
	<div class="inner">
		<h1 class="h6"><LangKey>{m.coming_soon()}</LangKey></h1>
		<section>
			<slot />
		</section>
	</div>
</article>

<style>
	article {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 3rem;
		align-items: center;
		justify-content: center;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		max-width: var(--width-md);
	}

	section {
		text-align: center;
	}
</style>
