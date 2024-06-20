<script lang="ts">
	import * as m from '$i18n/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article>
	<header>
		{m.recent_projects()}
	</header>
	<ul>...</ul>
</article>
